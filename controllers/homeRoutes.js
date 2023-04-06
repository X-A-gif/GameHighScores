const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
console.log("hello")
router.get('/login', (req, res) => {
    console.log('in login get route')
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/game');
      return;
    }
  
    res.render('/login');
  });
  
  module.exports = router;