const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const helpers = require('./utils/helpers');

const mysql = require('mysql2');
const path = require('path');
const router = require('./router');

const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const { DataTypes } = require('sequelize');

const players = {};


const Player = sequelize.define('player', {
  rotation: DataTypes.FLOAT,
  x: DataTypes.INTEGER,
  y: DataTypes.INTEGER,
  playerId: DataTypes.STRING
});

const hbs = exphbs.create({ helpers });
app.use(session({
    secret : 'secret123',
    resave : true,
    saveUninitialized : true
}));

app.engine('handlebars', exphbs({
  layoutsDir: __dirname + '/views/layouts',
  }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  //Serves the body of the page aka "homepage.handlebars" to the container //aka "main.handlebars"
  res.render('homepage', {layout : 'main'});
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use('/', router);




  

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port localhost:3001`);
  });
}).catch((err) => {
  console.error('Error syncing sequelize:', err);
});
