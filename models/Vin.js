const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vin extends Model {}

Vin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    producer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vintage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.ENUM('red', 'white', 'orange', 'rose', 'rosato'),
      allowNull: false,
    },
    is_natural: {
      type: DataTypes.BOOLEAN,
    },
    is_hand_picked: {
      type: DataTypes.BOOLEAN,
    },
    is_organic: {
      type: DataTypes.BOOLEAN,
    },
    is_filtered: {
      type: DataTypes.BOOLEAN,
    },
    is_added_sulfites: {
      type: DataTypes.BOOLEAN,
    },
    image: {
      type: DataTypes.STRING,
    },
    pair_with: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'vin'
  }
)

module.exports = Vin;