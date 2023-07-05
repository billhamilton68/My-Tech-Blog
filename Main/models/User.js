const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt'); 

class User extends Model {
     checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
     }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
    },
    {
        hooks: {
            
             beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
             },
        },
        sequelize,
        modelName: 'user',
        underscored: true,
        freezeTableName: true,
        timestamps: true
    }
);

module.exports = User;