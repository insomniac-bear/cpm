const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('login', 'Минимальгная длинна логина 1 символ').not().trim().escape(),
    check('password', 'Минимальная длинная пароля 6 символов').isLength({ min: 6 }).not().trim().escape()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        });
      }

      const {login, password} = req.body;

      const candidate = await User.findOne({ login });
      if (candidate) {
        return res.status(400).json({ message: `Такой пользователь уже существует` });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        login,
        password: hashedPassword
      });

      await user.save();

      res.status(201).json({ message: `Пользователь создан` });
    } catch (e) {
      res.status(500).json({message: `Что-то пошло не так. Error ${ e }`});
    };
  });

// /api/auth/login
router.post('/login',
  [
    check('login', 'Введите корректные данные').not().trim().escape(),
    check('password', 'Введите пароль').exists().not().trim().escape()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        });
      }

      const {login, password} = req.body;
      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).json({ message: 'Некорректные данные при входе' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Некорректные данные при входе' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      res.json({ token, userId: user.id });

    } catch (e) {
      res.status(500).json({message: `Что-то пошло не так. Error ${ e }`});
    };  
});

module.exports = router;
