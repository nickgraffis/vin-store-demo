const Vin = require('./Vin');
const User = require('./User');
const Star = require('./Star');

User.hasMany(Vin, {
  constraints: false
})

User.hasMany(Star, {
  constraints: false
})

Vin.hasMany(Star, {
  constraints: false
})

Vin.belongsTo(User, {
  constraints: false
})

Star.belongsTo(User, {
  constraints: false
})

Star.belongsTo(Vin, {
  constraints: false
})

module.exports = { Vin, User, Star };