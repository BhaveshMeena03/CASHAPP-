const walletModel = require('../models/walletModel');
const ApiError = require('../utils/errors');
const { formatCurrency } = require('../utils/money');
const db = require('../config/db');

// ────────────────────────────────────────────────────────
// GET /api/wallet/balance
// ────────────────────────────────────────────────────────
async function getBalance(req, res, next) {
    try {
        const wallet = await walletModel.findByUserId(req.user.id);
        if (!wallet) throw ApiError.notFound('Wallet not found');

        res.json({
            success: true,
            data: {
                walletId: wallet.id,
                balance: wallet.balance,
                formatted: formatCurrency(wallet.balance),
                currency: wallet.currency,
            },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// GET /api/wallet/statement?page=1&limit=20
// ────────────────────────────────────────────────────────
async function getStatement(req, res, next) {
    try {
        const wallet = await walletModel.findByUserId(req.user.id);
        if (!wallet) throw ApiError.notFound('Wallet not found');

        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
        const offset = (page - 1) * limit;

        // Count total entries
        const countResult = await db.query(
            'SELECT COUNT(*) AS total FROM ledger_entries WHERE wallet_id = $1',
            [wallet.id]
        );
        const total = parseInt(countResult.rows[0].total, 10);

        // Fetch paginated entries with transaction details
        const { rows: entries } = await db.query(
            `SELECT 
         le.*,
         t.type   AS transaction_type,
         t.note   AS transaction_note,
         t.status AS transaction_status,
         s.full_name AS sender_name,   s.cashtag AS sender_cashtag,
         r.full_name AS receiver_name, r.cashtag AS receiver_cashtag
       FROM ledger_entries le
       JOIN transactions t ON le.transaction_id = t.id
       JOIN users s ON t.sender_id   = s.id
       JOIN users r ON t.receiver_id = r.id
       WHERE le.wallet_id = $1
       ORDER BY le.created_at DESC
       LIMIT $2 OFFSET $3`,
            [wallet.id, limit, offset]
        );

        res.json({
            success: true,
            data: {
                walletId: wallet.id,
                balance: wallet.balance,
                formatted: formatCurrency(wallet.balance),
                entries,
                pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
            },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getBalance, getStatement };
