const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

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
                    attributes: ['username'],
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

router.get('/posts', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('posts', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/api/posts', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            user_id: req.session.user_id,
        });

        res.redirect('/posts');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('homepage', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }

    const errorMessage = req.flash('errorMessage');
    res.render('signup', { errorMessage });
});

router.post('/signup', async (req, res) => {
    try {
        const existingUser = await User.findOne({ where: { email: req.body.email } });

        if (existingUser) {
            req.flash('errorMessage', 'The user/email already exists');
            res.redirect('/signup');
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