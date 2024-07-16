const { update, getAllUsers } = require('../controllers/userController');

const router = require('express').Router();

router.post('/update', update);
router.post('/getAllUsers', getAllUsers);

module.exports = router;
