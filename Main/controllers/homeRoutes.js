const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

// Get route that sends the user to the signup page. If the client is already signed in, then it will just take them to their profile. 
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  const errorMessage = req.flash('errorMessage');
  res.render('signup', { errorMessage });
});

// This route is a POST route for sign up. Once the client has filled in the necessary information, the server will create the profile with the users informaiton. 
router.post('/signup', async (req, res) => {
  try {
    // const to determine if a user already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    
    // if statement that takes the const created and matches it to the attempted signup informaiton. If there is a user/email already there, then it will alert the user that this already exists. 
    if (existingUser) {
      req.flash('errorMessage', 'The user/email already exists');
      res.redirect('/signup');

      // This forces the user to select a password that is 8 or greater characters in length
    } else if (req.body.password.length < 8) {  
      req.flash('errorMessage', 'Password should be at least 8 characters');
      res.redirect('/signup');
    } else {
      const userData = await User.create(req.body);
   
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.redirect('/login');
      });
    }
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      req.flash('errorMessage', 'Validation error occurred. Please ensure that all fields meet requirements.');
    } else {
      console.log(err);
      res.status(500).json(err);
    }
    res.redirect('/signup');
  }
});

module.exports = router;