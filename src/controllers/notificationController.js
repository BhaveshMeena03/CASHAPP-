const notificationModel = require('../models/notificationModel');
const db = require('../config/db');
const ApiError = require('../utils/errors');

// ────────────────────────────────────────────────────────
// GET /api/notifications?page=1&limit=20
// ────────────────────────────────────────────────────────
async function getNotifications(req, res, next) {
    try {
        const userId = req.user.id;
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
        const offset = (page - 1) * limit;

        // Unread count
        const unreadResult = await db.query(
            'SELECT COUNT(*) AS count FROM notifications WHERE user_id = $1 AND is_read = FALSE',
            [userId]
        );
        const unreadCount = parseInt(unreadResult.rows[0].count, 10);

        // Total count
        const totalResult = await db.query(
            'SELECT COUNT(*) AS count FROM notifications WHERE user_id = $1',
            [userId]
        );
        const total = parseInt(totalResult.rows[0].count, 10);

        // Paginated list
        const { rows: notifications } = await db.query(
            `SELECT * FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
            [userId, limit, offset]
        );

        res.json({
            success: true,
            data: {
                notifications,
                unreadCount,
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
// PATCH /api/notifications/:id/read
// ────────────────────────────────────────────────────────
async function markAsRead(req, res, next) {
    try {
        const notification = await notificationModel.markAsRead(req.params.id);
        if (!notification) throw ApiError.notFound('Notification not found');

        // Verify ownership
        if (notification.user_id !== req.user.id) {
            throw ApiError.forbidden('Not your notification');
        }

        res.json({
            success: true,
            data: { notification },
            message: 'Marked as read',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// PATCH /api/notifications/read-all
// ────────────────────────────────────────────────────────
async function markAllAsRead(req, res, next) {
    try {
        const count = await notificationModel.markAllAsRead(req.user.id);

        res.json({
            success: true,
            data: { markedCount: count },
            message: count > 0 ? `Marked ${count} notification(s) as read` : 'No unread notifications',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getNotifications, markAsRead, markAllAsRead };
