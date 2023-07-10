const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comments');
const Liked = require('./Liked');

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

// Post has many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// Comments belong to a Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// User has many Likes
User.hasMany(Liked, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Likes belong to a User
Liked.belongsTo(User, {
    foreignKey: 'user_id'
});

// Post has many Likes
Post.hasMany(Liked, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// Likes belong to a Post
Liked.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Posts belong to many Users (through 'Liked')
Post.belongsToMany(User, {
  through: Liked,
  as: 'likers',
  foreignKey: 'post_id'
});

// Users belong to many Posts (through 'Liked')
User.belongsToMany(Post, {
  through: Liked,
  as: 'liked_posts',
  foreignKey: 'user_id'
});

module.exports = { User, Post, Comment, Liked};