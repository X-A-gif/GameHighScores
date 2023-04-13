const router = require('express').Router();
const { User, Player, Profile } = require('../models');
const withAuth = require('../utils/auth');
console.log("hello")

router.get('/', async (req, res) => {
    console.log("checking I ran");
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findAll({
        attributes: { exclude: ['password', 'email'] },
      });

 console.log(userData);

const users = userData.map((user)=> user.get({ plain: true }));

//console.log("user", user);

res.render('homepage', {
  logged_in: req.session.logged_in,
  users,
});
} catch (err) {
res.status(500).json(err);
}
});


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

  //res.render('game');

  res.render('game', {
    logged_in: req.session.logged_in
  });

});




router.get('/profile', withAuth, async (req, res) => {
        try {
          // Find the logged in user based on the session ID
          const userData = await User.findByPk(req.session.user_id,{
          attributes: { exclude: ['password','email'] },
        });
    
        const user = userData.get({ plain: true });
    
        res.render('profile', {
          user,
          logged_in: true
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });


module.exports = router;
