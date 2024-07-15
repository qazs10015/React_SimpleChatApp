const { update } = require('../controllers/userController');

const router = require('express').Router();

router.post('/update', update);

module.exports = router;
