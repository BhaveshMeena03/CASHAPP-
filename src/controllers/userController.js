const db = require('../config/db');
const userModel = require('../models/userModel');
const ApiError = require('../utils/errors');
const { hashPassword, comparePassword } = require('../utils/password');

// ────────────────────────────────────────────────────────
// GET /api/users/search?q=alice
// ────────────────────────────────────────────────────────
async function searchUsers(req, res, next) {
    try {
        const q = (req.query.q || '').trim();
        if (!q || q.length < 1) {
            return res.json({ success: true, data: { users: [] }, message: '', error: '' });
        }

        // Strip leading $ if user typed it, for flexible matching
        const term = q.startsWith('$') ? q.slice(1) : q;
        const pattern = `%${term}%`;

        const { rows } = await db.query(
            `SELECT id, full_name, cashtag, avatar_url
       FROM users
       WHERE id != $1
         AND (cashtag ILIKE $2 OR full_name ILIKE $2)
       ORDER BY
         CASE WHEN cashtag ILIKE $3 THEN 0 ELSE 1 END,
         full_name ASC
       LIMIT 20`,
            [req.user.id, pattern, `$${term}%`]
        );

        res.json({
            success: true,
            data: { users: rows },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// GET /api/users/:cashtag
// ────────────────────────────────────────────────────────
async function getUserProfile(req, res, next) {
    try {
        let { cashtag } = req.params;
        if (!cashtag.startsWith('$')) cashtag = `$${cashtag}`;

        const user = await userModel.findByCashtag(cashtag);
        if (!user) throw ApiError.notFound(`User ${cashtag} not found`);

        // Public profile — only safe fields
        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    fullName: user.full_name,
                    cashtag: user.cashtag,
                    avatarUrl: user.avatar_url,
                },
            },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// PATCH /api/users/profile
// ────────────────────────────────────────────────────────
async function updateProfile(req, res, next) {
    try {
        const { fullName, avatarUrl } = req.body;

        const updates = {};
        if (fullName !== undefined) updates.fullName = fullName;
        if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

        if (Object.keys(updates).length === 0) {
            throw ApiError.badRequest('Provide at least one field to update (fullName, avatarUrl)');
        }

        const updated = await userModel.updateUser(req.user.id, updates);
        if (!updated) throw ApiError.notFound('User not found');

        const { password_hash, ...safe } = updated;

        res.json({
            success: true,
            data: { user: safe },
            message: 'Profile updated',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// PATCH /api/users/password
// ────────────────────────────────────────────────────────
async function changePassword(req, res, next) {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await userModel.findById(req.user.id);
        if (!user) throw ApiError.notFound('User not found');

        const isMatch = await comparePassword(currentPassword, user.password_hash);
        if (!isMatch) throw ApiError.unauthorized('Current password is incorrect');

        const newHash = await hashPassword(newPassword);
        await userModel.updateUser(req.user.id, { passwordHash: newHash });

        res.json({
            success: true,
            data: null,
            message: 'Password changed successfully',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    searchUsers,
    getUserProfile,
    updateProfile,
    changePassword,
};
