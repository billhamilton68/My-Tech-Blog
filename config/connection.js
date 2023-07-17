const Sequelize = require('sequelize');
const dotenv = require('dotenv');


dotenv.config(); //initialize dotenv

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DIALECT || 'mysql',
        port: process.env.DB_PORT || 3306,
        dialectOptions: {
            ssl: {
                require: process.env.DB_ENV === 'production',
                rejectUnauthorized: false
            }
        },
        logging: console.log, 
        define: {
            timestamps: true,
            underscored: true
        }
    }
);

module.exports = sequelize;