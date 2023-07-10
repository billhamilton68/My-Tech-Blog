const router = require('express').Router();
const { User } = require('../../models');

const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
      res.redirect('/login');
  } else {
      next();
  }
};

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;

      // Include these lines to make the user's data available in handlebars templates
      req.session.user = dbUserData;
      res.locals.user = dbUserData;
      
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

router.put('/profile', withAuth, async (req, res) => {
  try {
      const { name, email } = req.body;
      
      

      await User.update({ name, email }, {
          where: {
              id: req.session.user_id,
          }
      });

      res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

module.exports = router;
