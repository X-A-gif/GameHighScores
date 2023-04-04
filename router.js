const express = require('express');
const session = require('express-session');
const path = require('path');
const User = require('./models/user');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.logged_in) {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
  }
  if (req.session.logged_in) {
    res.redirect(path.join(__dirname, './public', 'game.html'));
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/game', (req, res) => {
  if (req.session.logged_in) {
    res.sendFile(path.join(__dirname, './public', 'game.html'));
  } 

  else {
    alert('please login');
  }
});


router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'signup.html'));
});

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
