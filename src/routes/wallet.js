const { Router } = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/walletController');

const router = Router();

router.get('/balance', auth, controller.getBalance);
router.get('/statement', auth, controller.getStatement);

module.exports = router;
