const { Router } = require('express');
const {
  logUser,
  logoutUser,
  newPassword,
  registerUser,
} = require('../controllers/users.controller.js');

const router = Router();

router.post('/login', logUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);
router.post('/forgot-password', newPassword);
module.exports = router;
