// Main\server.js

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const homeRoutes = require('./controllers/homeRoutes.js');
const helpers = require('./utils/helpers');
const models = require('./models');
const flash = require('express-flash');
const Handlebars = require('handlebars');
//const flash = require('connect-flash');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Load environment variables
require('dotenv').config();

Handlebars.registerHelper('dateFormat', function(value) {
    const date = new Date(value);
    return date.toLocaleDateString();
});

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: process.env.SESSION_SECRET || 'development_secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Use secure cookies in production
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
//app.use(session({
//  secret: 'your_secret_key',
 // resave: false,
  //saveUninitialized: false
//}));

app.use(flash());

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRoutes);
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});