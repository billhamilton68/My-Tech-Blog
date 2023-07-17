# My-Tech-Blog
Description
"My Tech Blog" is a node.js application that allows users to create a new post, like a post, and comment on a post. The application leverages Express.js as the server and Sequelize as the ORM to interact with a MySQL database.

Installation
Clone the repo to your local machine using https://github.com/bhamilton68/my-tech-blog.git.

Ensure that Node.js is installed in your environment.

Then follow these steps:

Run npm install in the root directory to install the project dependencies.

Create a .env file in the root directory and add the following:

arduino
Copy code
DB_NAME='database_name'
DB_USER='your_username'
DB_PW='your_password'
SESSION_SECRET='your_secret'
In the root directory, run node server.js.

You should see the server start and print "Now listening on port 3001".

Usage
Once the server is running, open your browser and visit http://localhost:3001/. You should see the homepage load with a list of blog posts.

Features of the blog include:

User login/registration and session management, including encrypted password storage.
Ability for logged-in users to create new posts.
Ability for logged-in users to like and comment on existing posts.
Post filtering based on category.
Blog posts have associated metadata such as author, date, total likes, and category.
Posts display a "Read More" option if the post exceeds a certain length.
Users can edit or delete their own posts.


Directory Structure

📦my-tech-blog
 ┣ 📂controllers
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜postRoutes.js
 ┃ ┃ ┗ 📜userRoutes.js
 ┃ ┗ 📜homeRoutes.js
 ┣ 📂models
 ┃ ┗ 📜index.js
 ┣ 📂public
 ┃ ┗ 📂js
 ┃   ┗ 📜main.js
 ┣ 📂utils
 ┃ ┗ 📜helpers.js
 ┣ 📂views
 ┃ ┣ 📂layouts
 ┃ ┃ ┗ 📜main.handlebars
 ┃ ┗ 📜homepage.handlebars
 ┃ ┗ 📜posts.handlebars
 ┣ 📜.env.example
 ┣ 📜package.json
 ┗ 📜server.js
License
"My Tech Blog" is released under the MIT License.

Contribution
Please feel free to make any pull requests or suggest any improvements. All contributions are welcomed!

Questions
If you have any questions or issues, please contact me via email.


# Project-2

# TradeHub

* This is a Node.js application designed to allow users to post items for sale and non users to view a list of items for sale

# User Stories

* As a consumer, I want to be able to search for new or used items people posted for sale without viewing related products or items.

* As a product owner, I want to be able to post items for sale for other online viewers to view and purchase.


## Acceptance Criteria

* It's done when a user can sign up as a user to TradeHub.

* It's done when a user can login to TradeHub.

* It's done when a user can search for an item and only returns results for the specified search criteria

* It's done when a user can post an item for sale on TradeHub.

* It's done when all the items I post are associated and viewable in my profile.

* It's done when a user can click on a posted item for sale and is redirected to a page with a detailed         description of the item.


## GitHub Repository
https://github.com/jonathanjjolsen/TradeHub.git

## Hosted
 TradeHub is hosted on Heroku.com
 Navigate to https://tradehub.herokuapp.com/

## Usage / Features
1. Navigate to site url https://tradehub.herokuapp.com/
2. Site users can view a list of items listed for sale by users.
3. Site users required to signup to view detailed description of posts and / or post an item for sale. 
4. Site users required to signup to post an item for sale. 
5. Site users must enter their name, a unique email address and a password with a minimum length of 8 digits.
6. Registered users will be able to post items for sale and include Item Name, Price(USD), Manufacturer, Item Category, Color (if applicable), year manufactured and a description of the item.  
7. Items posted by a user will be associated with the users profile.
8. Users interested in purchasing the items will use the posted contacted information of the seller to arrange/negotiate purchase.

## Main Components:
Node.js <br/>
Handlebars.js <br/>
Materialize <br/>
MySql <br/>
Express




## Designed and created by:
Chris Gramer<br/>
Jonathan Olsen<br/>
Adam Fox<br/>
Bill Hamilton