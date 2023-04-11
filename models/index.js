const User = require('./user');
const Player = require('./player');
//const Profile = require ('./profile');

User.hasOne(Player, {
  foreignKey: 'userId',
});

module.exports = { User, Player};
