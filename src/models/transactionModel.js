const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a new transaction.
 * @param {object} data — { senderId, receiverId, amount, type, note, status }
 * @param {object} [client] — optional pg client (for external DB transactions)
 * @returns {object} the new transaction row
 */
async function createTransaction({ senderId, receiverId, amount, type, note, status }, client) {
    const conn = client || db;
    const id = uuidv4();
    const { rows } = await conn.query(
        `INSERT INTO transactions (id, sender_id, receiver_id, amount, type, note, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
        [id, senderId, receiverId, amount, type, note || null, status || 'pending']
    );
    return rows[0];
}

/**
 * Find a transaction by its UUID.
 */
async function findById(id) {
    const { rows } = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);
    return rows[0] || null;
}

/**
 * Find transactions involving a user (as sender or receiver) with pagination.
 *
 * @param {string}  userId
 * @param {object}  options
 * @param {number}  [options.page=1]    — 1-indexed page number
 * @param {number}  [options.limit=20]  — rows per page
 * @param {string}  [options.type]      — optional filter: 'send' | 'request'
 * @param {string}  [options.status]    — optional filter
 * @returns {{ transactions: object[], total: number, page: number, totalPages: number }}
 */
async function findByUserId(userId, { page = 1, limit = 20, type, status } = {}) {
    const conditions = ['(sender_id = $1 OR receiver_id = $1)'];
    const values = [userId];
    let paramIdx = 2;

    if (type) {
        conditions.push(`type = $${paramIdx}`);
        values.push(type);
        paramIdx++;
    }
    if (status) {
        conditions.push(`status = $${paramIdx}`);
        values.push(status);
        paramIdx++;
    }

    const whereClause = conditions.join(' AND ');

    // Total count
    const countResult = await db.query(
        `SELECT COUNT(*) AS total FROM transactions WHERE ${whereClause}`,
        values
    );
    const total = parseInt(countResult.rows[0].total, 10);

    // Paginated results
    const offset = (page - 1) * limit;
    const { rows: transactions } = await db.query(
        `SELECT * FROM transactions
     WHERE ${whereClause}
     ORDER BY created_at DESC
     LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
        [...values, limit, offset]
    );

    return {
        transactions,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
}

/**
 * Update a transaction's status.
 * @param {string} id     — transaction UUID
 * @param {string} status — new status (pending/completed/failed/cancelled)
 * @param {object} [client] — optional pg client
 * @returns {object} the updated transaction row
 */
async function updateStatus(id, status, client) {
    const conn = client || db;
    const { rows } = await conn.query(
        `UPDATE transactions SET status = $1, updated_at = NOW()
     WHERE id = $2 RETURNING *`,
        [status, id]
    );
    return rows[0] || null;
}

module.exports = {
    createTransaction,
    findById,
    findByUserId,
    updateStatus,
};
