const express = require('express');
const { postUser, loginHandler } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', postUser);
router.post('/login', loginHandler);

module.exports = router;
