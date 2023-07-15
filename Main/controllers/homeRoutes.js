const router = require('express').Router();
const { Post, User, Liked, Session, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { format } = require('date-fns');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: User,
          as: 'likers',
          attributes: ['id'],
          through: { attributes: [] },
        },
      ],
    });

    const posts = postData.map((post) => {
      const plainPost = post.get({ plain: true });
      plainPost.userLiked = plainPost.likers.some((liker) => liker.id === req.session.user_id);
      return plainPost;
    });

    console.log('Logged in status:', req.session.logged_in);

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    logged_in: req.session.logged_in,
    username: req.session.username,
  });
});

router.get('/posts', withAuth, async (req, res) => {
  try {
      const sessionUserId = req.session.user_id;

    const postData = await Post.findAll({
      where: {
        user_id: sessionUserId
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    });

    const posts = postData.map((post) => {
      let postObj = post.get({ plain: true });
      postObj.username = postObj.user.username;
      return postObj;
    });

    res.render('posts', { 
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

  router.get('/posts/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: User,
            as: 'likers',
            attributes: ['id'],
            through: { attributes: [] },
          }
        ],
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      const post = postData.get({ plain: true });
      post.userLiked = post.likers.some((liker) => liker.id === req.session.user_id);
  
      res.render('single-post', {
        post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.post('/api/comments', async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
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
    const userData = await User.findOne({
      where: { id: req.session.user_id },
      include: [
        {
          model: Post,
          include: [
            {
              model: Liked,
              attributes: ['id'],
            },
          ],
        },
      ],
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData.get({ plain: true });

    let totalLikes = 0;
    user.posts.forEach((post) => {
      totalLikes += post.likeds.length;
    });

    const formattedDate = format(new Date(user.createdAt), 'MMMM dd, yyyy');

    const profileData = {
      username: user.username,
      email: user.email,
      created_at: formattedDate,
      posts_count: user.posts.length,
      likes_count: totalLikes,
      logged_in: req.session.logged_in,
      username: req.session.username,
    };

    res.render('profile', profileData);
  } catch (err) {
    console.log(err);
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

module.exports = router;