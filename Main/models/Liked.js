const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Liked extends Model {}

Liked.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  unique: true, 
  references: {
    model: 'User',
    key: 'id',
  },
},
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'liked',
    }
);

module.exports = Liked;