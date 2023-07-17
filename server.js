const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const homeRoutes = require('./controllers/homeRoutes.js');
const userRoutes = require('./controllers/api/userRoutes'); 
const postRoutes = require('./controllers/api/postRoutes.js');
const helpers = require('./utils/helpers');
const models = require('./models');
const flash = require('connect-flash');
const Handlebars = require('handlebars');

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
const hbs = exphbs.create({
  helpers: {
    format_date: helpers.format_date,
    truncate: helpers.truncate,
    gt: helpers.gt,
    eq: helpers.eq,
    log: helpers.log
  }
});

const sess = {
  secret: process.env.SESSION_SECRET || 'development_secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use secure cookies in production
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash('errorMessage');
  next();
});

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Adding session to res.locals
app.use((req, res, next) => {
  if (req.session) {
    res.locals.session = req.session;
  }
  next();
});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/posts', postRoutes);


// Sync models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});