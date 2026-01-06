const express = require('express');
const router = express.Router();
const { registerUser , loginUser, logoutUser } = require('../controllers/authController');


router.post('/register', registerUser);
router.post('/loginUser', loginUser);
router.post('/logoutuser', logoutUser);

module.exports = router;