require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const key = process.env.TOKEN_SECRET_KEY;

const postUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      const error = new Error('Username dan password wajib diisi');
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      const error = new Error('Username sudah terdaftar');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      key,
      { algorithm: 'HS256' }
    );

    res.status(201).json({
      status: 'Success',
      message: 'Register Successful!',
      token,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      const error = new Error('Username dan password wajib diisi');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      const error = new Error('Username atau password salah');
      error.statusCode = 401;
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error('Username atau password salah');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      key,
      { algorithm: 'HS256' }
    );

    res.status(200).json({
      status: 'Success',
      message: 'Login Successful!',
      token,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

module.exports = {
  postUser,
  loginHandler,
};