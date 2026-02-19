const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a notification for a user.
 * @param {object} data — { userId, message, type, referenceId }
 * @returns {object} the new notification row
 */
async function createNotification({ userId, message, type, referenceId }) {
    const id = uuidv4();
    const { rows } = await db.query(
        `INSERT INTO notifications (id, user_id, message, type, reference_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [id, userId, message, type || null, referenceId || null]
    );
    return rows[0];
}

/**
 * Find all notifications for a user, most recent first.
 * @param {string} userId
 * @param {object} options
 * @param {boolean} [options.unreadOnly=false]
 * @returns {object[]}
 */
async function findByUserId(userId, { unreadOnly = false } = {}) {
    const where = unreadOnly
        ? 'WHERE user_id = $1 AND is_read = FALSE'
        : 'WHERE user_id = $1';

    const { rows } = await db.query(
        `SELECT * FROM notifications ${where} ORDER BY created_at DESC`,
        [userId]
    );
    return rows;
}

/**
 * Mark a single notification as read.
 * @param {string} notificationId
 * @returns {object} the updated notification row
 */
async function markAsRead(notificationId) {
    const { rows } = await db.query(
        `UPDATE notifications SET is_read = TRUE WHERE id = $1 RETURNING *`,
        [notificationId]
    );
    return rows[0] || null;
}

/**
 * Mark all notifications as read for a user.
 * @param {string} userId
 * @returns {number} count of notifications updated
 */
async function markAllAsRead(userId) {
    const result = await db.query(
        `UPDATE notifications SET is_read = TRUE WHERE user_id = $1 AND is_read = FALSE`,
        [userId]
    );
    return result.rowCount;
}

module.exports = {
    createNotification,
    findByUserId,
    markAsRead,
    markAllAsRead,
};
