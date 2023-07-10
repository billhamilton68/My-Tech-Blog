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
            references: {
                model: 'user',
                key: 'id',
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'post_id']
            }
        ],
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'liked',
    }
);

module.exports = Liked;