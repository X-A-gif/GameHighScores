const User = require('./user');
const Player = require('./player');

User.hasOne(Player, {
  foreignKey: 'userId',
});


module.exports = { User, Player };
