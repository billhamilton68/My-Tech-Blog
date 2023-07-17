const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class Session extends Model {}

Session.init(
    {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        expires: {
            type: DataTypes.DATE,
        },
        data: {
            type: DataTypes.TEXT,
        }
    },
    {
        sequelize,
        modelName: 'Session',
        freezeTableName: true,
        underscored: true,
        createdAt: 'createdat',
        updatedAt: 'updatedat'
    }
);

module.exports = Session;