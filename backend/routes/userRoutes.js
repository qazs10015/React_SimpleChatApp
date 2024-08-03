const { update, getAllUsers, getCurrentUser } = require('../controllers/userController');

const router = require('express').Router();

router.post('/update', update);
router.post('/getAllUsers', getAllUsers);
router.post('/getCurrentUser', getCurrentUser);

module.exports = router;
