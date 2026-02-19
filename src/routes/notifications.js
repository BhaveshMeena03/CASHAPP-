const { Router } = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/notificationController');

const router = Router();

// NOTE: /read-all must come BEFORE /:id/read to avoid route conflict
router.patch('/read-all', auth, controller.markAllAsRead);
router.get('/', auth, controller.getNotifications);
router.patch('/:id/read', auth, controller.markAsRead);

module.exports = router;
