const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comments');
const Like = require('./Like');

// User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Posts belong to a User
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Comments belong to a User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// User has many Likes
User.hasMany(Like, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Likes belong to a User
Like.belongsTo(User, {
    foreignKey: 'user_id'
});

// Posts have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// Comments belong to a Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Posts have many Likes
Post.hasMany(Like, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// Likes belong to a Post
Like.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment, Like };