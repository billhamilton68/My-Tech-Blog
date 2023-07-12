const router = require('express').Router();
const { User } = require('../../models');

const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Signup route
router.post('/signup', async (req, res) => {
  try {
    // Check if the password length is less than 8
    if (req.body.password.length < 8) {
      req.flash('errorMessage', 'Password should be at least 8 characters');
      res.redirect('/signup');
    } else {
      const userData = await User.create(req.body);
  
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username; // Store username in the session

      req.session.save(err => {
        if (err) {
          res.status(500).json(err);
        } else {
         
          res.redirect('/');
        }
      });
    }
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      req.flash('errorMessage', 'Validation error occurred. Please ensure that all fields meet requirements.');
      res.redirect('/signup');
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});
// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const dbUserData = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!dbUserData) {
      return res.status(400).json({ message: 'No user with that email address!' });
    }

    const validPassword = await dbUserData.checkPassword(password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect password!' });
    }

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: 'Could not save the session', error: err });
      }

      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      req.session.username = dbUserData.username; // Store username in the session

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Unexpected error occurred', error: err });
  }
});
// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

// Update profile route
router.put('/profile', withAuth, async (req, res) => {
  try {
    const { name, email } = req.body;

    await User.update(
      { name, email },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;