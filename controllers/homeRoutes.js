const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
console.log("hello")
router.get('/login', (req, res) => {
    console.log('in login get route in homeroutes')
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/game');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
  console.log('in signup get route in homeroutes')
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/game');
   return;
  }

  res.render('signup');
});

router.get('/game', (req, res) => {
  console.log('in game get route in homeroutes')
   if (!req.session.logged_in) {
    res.render('login');
   return;
  }

  res.render('game');
});

 // router.post('/signup', async (req, res) => {
  //try {
   // const userData = await User.create(req.body);

   // req.session.save(() => {
    //  req.session.user_id = userData.id;
    //  req.session.logged_in = true;

     // res.status(200).json(userData);
   // });
   // console.log(req.session.id)
//  } catch (err) {
//    res.status(400).json(err);
 // }
//});
  
  module.exports = router;