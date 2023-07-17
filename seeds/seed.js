const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const posts = blogData.map((blog) => ({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    }));

    await Post.bulkCreate(posts);

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();