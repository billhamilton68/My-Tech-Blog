const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // Add additional fields if required
    },
    {
        sequelize,
        modelName: 'post',
        underscored: true,
        freezeTableName: true,
        timestamps: true
    }
);

module.exports = Post;