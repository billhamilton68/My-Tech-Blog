# My-Tech-Blog

You should see the server start and print "Now listening on port 3001".



# Project-2

# My-Tech-Blog

* "My Tech Blog" is a node.js application that allows users to create a new post, like a post, and comment on a post. The application leverages Express.js as the server and Sequelize as the ORM to interact with a MySQL database.

# User Stories

* As a consumer, I want to be able to search for new or used items people posted for sale without viewing related products or items.

* As a product owner, I want to be able to post items for sale for other online viewers to view and purchase.


## Acceptance Criteria

* It's done when a user can sign up as a user to My-Tech-Blog.

* It's done when a user can login to My-Tech-Blog.

* It's done when a user can view posts by other users.

* It's done when a user can Like and Comment on posts by other users.

* It's done when a user can edit their posts.

* It's done when a user can their posts.



## Installation
* Clone the repo to your local machine using https://github.com/bhamilton68/my-tech-blog.git.

* Ensure that Node.js is installed in your environment.

* Then follow these steps:

* Run npm install in the root directory to install the project dependencies.

* Create a .env file in the root directory and add the following:

DB_NAME='database_name'
DB_USER='your_username'
DB_PW='your_password'
SESSION_SECRET='your_secret'

* Run npm run start to seed database
* In the root directory, run node server.js.

## Usage
Once the server is running, open your browser and visit http://localhost:3001/. You should see the homepage load with a list of blog posts.

## Features of the blog include:

User login/registration and session management, including encrypted password storage.
Ability for logged-in users to create new posts.
Ability for logged-in users to like and comment on existing posts.
Post filtering based on category.
Blog posts have associated metadata such as author, date, total likes, and category.
Posts display a "Read More" option if the post exceeds a certain length.
Users can edit or delete their own posts.



## GitHub Repository
https://github.com/billhamilton68/My-Tech-Blog.git

## Hosted
 My-Tech-Blog is hosted on Heroku.com
 Navigate to https://git.heroku.com/mytechblog-bh.git
 

## Main Components:
Node.js 
Handlebars.js 
MySql 
Express

Contribution
Please feel free to make any pull requests or suggest any improvements. All contributions are welcomed!

Questions
If you have any questions or issues, please contact me via email.


## Designed and created by:
Bill Hamilton