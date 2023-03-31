const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');
const sequelize = require('./config/connection');


const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

router.post('/auth', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        sequelize.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/game');
            } else {
                response.send('Incorrect Username and/or Password!');
            }           
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

router.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'game.html'));
  });

router.get('/game', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'signup.html'));
});

router.post('/signup', (req, res) => {
    let username = request.body.username;
    let password = request.body.password;
   
    connection.query('INSERT INTO accounts (username, password) VALUES (?, ?)', [username, password], (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ message: 'account created' });
    });
    
  });


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;

