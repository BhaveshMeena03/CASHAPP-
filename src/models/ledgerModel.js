const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a ledger entry.
 * @param {object} data — { transactionId, walletId, entryType, amount }
 * @param {object} [client] — optional pg client (for external DB transactions)
 * @returns {object} the new ledger entry row
 */
async function createEntry({ transactionId, walletId, entryType, amount }, client) {
    const conn = client || db;
    const id = uuidv4();
    const { rows } = await conn.query(
        `INSERT INTO ledger_entries (id, transaction_id, wallet_id, entry_type, amount)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [id, transactionId, walletId, entryType, amount]
    );
    return rows[0];
}

/**
 * Find all ledger entries for a given transaction.
 * @param {string} transactionId
 * @returns {object[]} array of ledger entry rows
 */
async function findByTransactionId(transactionId) {
    const { rows } = await db.query(
        `SELECT * FROM ledger_entries
     WHERE transaction_id = $1
     ORDER BY created_at ASC`,
        [transactionId]
    );
    return rows;
}

module.exports = {
    createEntry,
    findByTransactionId,
};
