const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);


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


app.use(session({
    secret : 'secret123',
    resave : true,
    saveUninitialized : true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use('/', router);

io.on('connection', function (socket) {
  console.log('a user connected');
  // create a new player and add it to our players object
  const newPlayer = Player.create({
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
  });
  players[socket.id] = newPlayer;
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', newPlayer);
  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected');
    // remove this player from our players object and the database
    Player.destroy({ where: { playerId: socket.id } });
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('player-disconnect', socket.id);
  });
  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].rotation = movementData.rotation;
    // save the player's data to the database
    players[socket.id].save();
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });
});
  

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port localhost:3001`);
  });
}).catch((err) => {
  console.error('Error syncing sequelize:', err);
});
