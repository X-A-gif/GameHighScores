const express = require('express');
const { User, Player, Profile } = require('../../models');
const router = express.Router();
const withAuth = require('../../utils/auth');

router.get('/profile', withAuth, async (req, res) => {
    console.log('profile', req.session.logged_in)
    // If the user is already logged in, redirect the request to another route
    try {
      const profiles = await User.findall({
        attributes: { exclude: ['password','email'] },
    
      });
     // console.log("profileData", profiles);
      res.render('profile' , profiles);
    }  catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;