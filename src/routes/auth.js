const { Router } = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const controller = require('../controllers/authController');

const router = Router();

// ── Validation schemas ───────────────────────────────

const registerSchema = {
    email: { type: 'email', required: true },
    password: { type: 'string', required: true, min: 6, max: 128 },
    fullName: { type: 'string', required: true, min: 1, max: 255 },
    phone: { type: 'string', required: false },
    cashtag: { type: 'string', required: false, max: 50 },
};

const loginSchema = {
    email: { type: 'email', required: true },
    password: { type: 'string', required: true },
};

const refreshSchema = {
    refreshToken: { type: 'string', required: true },
};

// ── Routes ───────────────────────────────────────────

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.get('/me', auth, controller.getMe);
router.post('/logout', auth, controller.logout);
router.post('/refresh', validate(refreshSchema), controller.refreshToken);

module.exports = router;
