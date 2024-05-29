const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  starting_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  current_price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: starting_price
  },

  image_url: {
    type: DataTypes.VARCHAR(255)
  },
  end_time: {
    type: DataTypes.TIMESTAMP,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
defaultValue: CURRENT_TIMESTAMP
  },

}, {
  timestamps: true,
});

Item.belongsTo(User, { foreignKey: 'userId' });

module.exports = Item;





    

