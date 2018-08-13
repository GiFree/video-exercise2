const express = require('express');
const auth = require('../../middlewares/auth');
const credentials = require('../../middlewares/credentials');
const { User } = require('../../sequelize');

const router = express.Router();

router.post('/login', credentials, (req, res, next) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (user.validatePassword(req.body.password)) {
        const token = user.generateJWT();
        return res.status(200).json({ token });
      }
      return res.status(400).json({ error: { password: 'wrong password' } });
    })
    .catch((err) => {
      return res.status(400).json({ error: { user: 'not found' } });
    });
});

router.post('/add', credentials, (req, res, next) => {
  const user = {
    username: req.body.username,
    hash: req.body.password,
  }

  User.create(user)
    .then(() => res.status(200).json({ sucess: true }))
    .catch((err) => {
      return res.status(400).json({ error: { user: 'unable to create' } });
    });
});

router.get('/id', auth, (req, res, next) => {
  return res.status(200).json({ id: req.user.id });
});

router.get('/favorites', auth, (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      return res.status(200).json({ favorites: user.favorites });
    })
    .catch((err) => {
      return res.status(400).json({ error: { user: 'not found' } });
    });
});

router.post('/favorites/:id', auth, (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      user.favorites = [...user.favorites, { id: req.params.id }];
      return user.save();
    })
    .then((user) => {
      res.status(200).json({ sucess: true, favorites: user.favorites });
    })
    .catch((err) => {
      res.status(400).json({ error: { message: err.message } });
    })
});

module.exports = router;