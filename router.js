const express = require('express');
const session = require('express-session');
const path = require('path');
const User = require('./models/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

router.post('/auth', async function (req, res) {
  const { name, password } = req.body;
  if (name && password) {
    try {
      const user = await User.findOne({ where: { name, password } });
      if (user) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/game');
      } else {
        res.send('Incorrect Username and/or Password!');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  } else {
    res.send('Please enter Username and Password!');
  }
});

router.get('/game', (req, res) => {
  if (req.session.loggedin) {
    res.send('Welcome back, ' + req.session.username + '!');
  } else {
    res.send('Please login to view this page!');
  }
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'signup.html'));
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.json({ message: 'account created' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
