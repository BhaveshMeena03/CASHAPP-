const db = require('../config/db');
const userModel = require('../models/userModel');
const walletModel = require('../models/walletModel');
const transactionModel = require('../models/transactionModel');
const ledgerModel = require('../models/ledgerModel');
const notificationModel = require('../models/notificationModel');
const ApiError = require('../utils/errors');
const { formatCurrency } = require('../utils/money');

// ────────────────────────────────────────────────────────
// POST /api/transfer/send
// ────────────────────────────────────────────────────────
async function sendMoney(req, res, next) {
    const client = await db.pool.connect();
    try {
        const { cashtag, amount, note } = req.body;
        const senderId = req.user.id;

        // ── Validate receiver ──
        const receiver = await userModel.findByCashtag(cashtag);
        if (!receiver) throw ApiError.notFound(`User ${cashtag} not found`);
        if (receiver.id === senderId) throw ApiError.badRequest('Cannot send money to yourself');

        // ── Validate sender wallet ──
        const senderWallet = await walletModel.findByUserId(senderId);
        if (!senderWallet) throw ApiError.internal('Sender wallet not found');
        if (Number(senderWallet.balance) < amount) throw ApiError.badRequest('Insufficient balance');

        const receiverWallet = await walletModel.findByUserId(receiver.id);
        if (!receiverWallet) throw ApiError.internal('Receiver wallet not found');

        // ── Atomic transfer ──
        await client.query('BEGIN');

        // 1. Debit sender
        await walletModel.debitWallet(senderWallet.id, amount, client);

        // 2. Credit receiver
        await walletModel.creditWallet(receiverWallet.id, amount, client);

        // 3. Create transaction record
        const tx = await transactionModel.createTransaction({
            senderId,
            receiverId: receiver.id,
            amount,
            type: 'send',
            note: note || null,
            status: 'completed',
        }, client);

        // 4. Create ledger entries (debit for sender, credit for receiver)
        await ledgerModel.createEntry({
            transactionId: tx.id,
            walletId: senderWallet.id,
            entryType: 'debit',
            amount,
        }, client);

        await ledgerModel.createEntry({
            transactionId: tx.id,
            walletId: receiverWallet.id,
            entryType: 'credit',
            amount,
        }, client);

        // 5. Create notifications
        const sender = await userModel.findById(senderId);
        await notificationModel.createNotification({
            userId: receiver.id,
            message: `${sender.cashtag} sent you ${formatCurrency(amount)}`,
            type: 'payment_received',
            referenceId: tx.id,
        });

        await notificationModel.createNotification({
            userId: senderId,
            message: `You sent ${formatCurrency(amount)} to ${receiver.cashtag}`,
            type: 'payment_sent',
            referenceId: tx.id,
        });

        await client.query('COMMIT');

        res.status(201).json({
            success: true,
            data: { transaction: tx },
            message: `Sent ${formatCurrency(amount)} to ${receiver.cashtag}`,
            error: '',
        });
    } catch (err) {
        await client.query('ROLLBACK');
        next(err);
    } finally {
        client.release();
    }
}

// ────────────────────────────────────────────────────────
// POST /api/transfer/request
// ────────────────────────────────────────────────────────
async function requestMoney(req, res, next) {
    try {
        const { cashtag, amount, note } = req.body;
        const requesterId = req.user.id;

        const requestedUser = await userModel.findByCashtag(cashtag);
        if (!requestedUser) throw ApiError.notFound(`User ${cashtag} not found`);
        if (requestedUser.id === requesterId) throw ApiError.badRequest('Cannot request money from yourself');

        // Create a pending request transaction
        // In a request: sender = the person being asked to pay, receiver = the person requesting
        const tx = await transactionModel.createTransaction({
            senderId: requestedUser.id,
            receiverId: requesterId,
            amount,
            type: 'request',
            note: note || null,
            status: 'pending',
        });

        const requester = await userModel.findById(requesterId);
        await notificationModel.createNotification({
            userId: requestedUser.id,
            message: `${requester.cashtag} requested ${formatCurrency(amount)} from you`,
            type: 'payment_request',
            referenceId: tx.id,
        });

        res.status(201).json({
            success: true,
            data: { transaction: tx },
            message: `Requested ${formatCurrency(amount)} from ${requestedUser.cashtag}`,
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// POST /api/transfer/respond/:transactionId
// Body: { action: "accept" | "decline" }
// ────────────────────────────────────────────────────────
async function respondToRequest(req, res, next) {
    const client = await db.pool.connect();
    try {
        const { transactionId } = req.params;
        const { action } = req.body;
        const userId = req.user.id;

        const tx = await transactionModel.findById(transactionId);
        if (!tx) throw ApiError.notFound('Transaction not found');
        if (tx.type !== 'request') throw ApiError.badRequest('This is not a payment request');
        if (tx.status !== 'pending') throw ApiError.badRequest(`Request already ${tx.status}`);

        // The sender_id is the person being asked to pay
        if (tx.sender_id !== userId) {
            throw ApiError.forbidden('You are not the recipient of this request');
        }

        if (action === 'decline') {
            const cancelled = await transactionModel.updateStatus(tx.id, 'cancelled');

            // Notify the requester
            const decliner = await userModel.findById(userId);
            await notificationModel.createNotification({
                userId: tx.receiver_id,
                message: `${decliner.cashtag} declined your ${formatCurrency(tx.amount)} request`,
                type: 'request_declined',
                referenceId: tx.id,
            });

            return res.json({
                success: true,
                data: { transaction: cancelled },
                message: 'Request declined',
                error: '',
            });
        }

        // ── Accept: execute the transfer atomically ──
        const senderWallet = await walletModel.findByUserId(tx.sender_id);
        if (!senderWallet) throw ApiError.internal('Sender wallet not found');
        if (Number(senderWallet.balance) < Number(tx.amount)) throw ApiError.badRequest('Insufficient balance');

        const receiverWallet = await walletModel.findByUserId(tx.receiver_id);
        if (!receiverWallet) throw ApiError.internal('Receiver wallet not found');

        await client.query('BEGIN');

        // 1. Debit sender (the person accepting the request)
        await walletModel.debitWallet(senderWallet.id, tx.amount, client);

        // 2. Credit receiver (the person who requested)
        await walletModel.creditWallet(receiverWallet.id, tx.amount, client);

        // 3. Update transaction status
        const completed = await transactionModel.updateStatus(tx.id, 'completed', client);

        // 4. Create ledger entries
        await ledgerModel.createEntry({
            transactionId: tx.id,
            walletId: senderWallet.id,
            entryType: 'debit',
            amount: tx.amount,
        }, client);

        await ledgerModel.createEntry({
            transactionId: tx.id,
            walletId: receiverWallet.id,
            entryType: 'credit',
            amount: tx.amount,
        }, client);

        // 5. Notifications
        const sender = await userModel.findById(tx.sender_id);
        const receiver = await userModel.findById(tx.receiver_id);

        await notificationModel.createNotification({
            userId: tx.receiver_id,
            message: `${sender.cashtag} accepted your ${formatCurrency(tx.amount)} request`,
            type: 'request_accepted',
            referenceId: tx.id,
        });

        await notificationModel.createNotification({
            userId: tx.sender_id,
            message: `You paid ${formatCurrency(tx.amount)} to ${receiver.cashtag}`,
            type: 'payment_sent',
            referenceId: tx.id,
        });

        await client.query('COMMIT');

        res.json({
            success: true,
            data: { transaction: completed },
            message: `Accepted — sent ${formatCurrency(tx.amount)} to ${receiver.cashtag}`,
            error: '',
        });
    } catch (err) {
        await client.query('ROLLBACK');
        next(err);
    } finally {
        client.release();
    }
}

// ────────────────────────────────────────────────────────
// GET /api/transfer/history?page=1&limit=20&type=sent|received|requests
// ────────────────────────────────────────────────────────
async function getTransactionHistory(req, res, next) {
    try {
        const userId = req.user.id;
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
        const typeFilter = req.query.type; // 'sent' | 'received' | 'requests'

        // Build query with optional type filter
        let conditions = [];
        const values = [userId];
        let paramIdx = 2;

        if (typeFilter === 'sent') {
            conditions.push('sender_id = $1');
            conditions.push("type = 'send'");
        } else if (typeFilter === 'received') {
            conditions.push('receiver_id = $1');
            conditions.push("type = 'send'");
        } else if (typeFilter === 'requests') {
            conditions.push('(sender_id = $1 OR receiver_id = $1)');
            conditions.push("type = 'request'");
        } else {
            conditions.push('(sender_id = $1 OR receiver_id = $1)');
        }

        const whereClause = conditions.join(' AND ');
        const offset = (page - 1) * limit;

        // Count
        const countResult = await db.query(
            `SELECT COUNT(*) AS total FROM transactions WHERE ${whereClause}`,
            values
        );
        const total = parseInt(countResult.rows[0].total, 10);

        // Fetch transactions with counterparty info joined
        const { rows: transactions } = await db.query(
            `SELECT 
         t.*,
         s.full_name  AS sender_name,
         s.cashtag    AS sender_cashtag,
         r.full_name  AS receiver_name,
         r.cashtag    AS receiver_cashtag
       FROM transactions t
       JOIN users s ON t.sender_id   = s.id
       JOIN users r ON t.receiver_id = r.id
       WHERE ${whereClause.replace(/sender_id/g, 't.sender_id').replace(/receiver_id/g, 't.receiver_id').replace(/type/g, 't.type')}
       ORDER BY t.created_at DESC
       LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
            [...values, limit, offset]
        );

        res.json({
            success: true,
            data: {
                transactions,
                pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
            },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// GET /api/transfer/:transactionId
// ────────────────────────────────────────────────────────
async function getTransactionById(req, res, next) {
    try {
        const userId = req.user.id;
        const { transactionId } = req.params;

        // Fetch with counterparty info
        const { rows } = await db.query(
            `SELECT 
         t.*,
         s.full_name AS sender_name,   s.cashtag AS sender_cashtag,
         r.full_name AS receiver_name, r.cashtag AS receiver_cashtag
       FROM transactions t
       JOIN users s ON t.sender_id   = s.id
       JOIN users r ON t.receiver_id = r.id
       WHERE t.id = $1`,
            [transactionId]
        );

        const tx = rows[0];
        if (!tx) throw ApiError.notFound('Transaction not found');

        // Only allow participants to view
        if (tx.sender_id !== userId && tx.receiver_id !== userId) {
            throw ApiError.forbidden('You are not part of this transaction');
        }

        // Include ledger entries
        const ledgerEntries = await ledgerModel.findByTransactionId(transactionId);

        res.json({
            success: true,
            data: { transaction: tx, ledgerEntries },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    sendMoney,
    requestMoney,
    respondToRequest,
    getTransactionHistory,
    getTransactionById,
};
