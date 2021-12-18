const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Star extends Model {}

Star.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    vin_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vin',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'star'
  }
)

module.exports = Star;