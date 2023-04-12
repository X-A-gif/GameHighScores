const express = require('express');
const session = require('express-session');
const path = require('path');
const User = require('./models/user');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.logged_in) {
   // res.sendFile(path.join(__dirname, './public', 'index.html'));
  }
  if (req.session.logged_in) {
    res.redirect(path.join(__dirname, './public', 'game.html'));
  }
});

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;