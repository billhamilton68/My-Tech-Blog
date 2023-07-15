
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
const { Liked } = require('../../models');
const { User } = require('../../models');
const { Comment } = require('../../models');
const helpers = require('../../utils/helpers');



let result = helpers.eq("arg1", "arg2");
console.log(result);

router.post('/', withAuth, async (req, res) => {
  try {
      const newPost = await Post.create({ 
          ...req.body,
          user_id: req.session.user_id,
      });

      res.status(201).json(newPost); 
  } catch (err) {
      console.error(err); // Log the error
      res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,

            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// EDIT a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
                username: req.session.username,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/like', withAuth, async (req, res) => {
    try {
      const newLike = await Liked.create({
        user_id: req.session.user_id,
        post_id: req.body.postId,
        username: req.session.username,
      });
      res.json(newLike);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

router.post('/comments', async (req, res) => {
  try {
      const comment = await Comment.create({
          content: req.body.content,
          user_id: req.session.user_id, 
          post_id: req.body.post_id
      });
      res.json(comment);
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});
router.get('/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [
              {
                  model: User,
                  attributes: ['username'],
              },
              {
                  model: Liked,
                  attributes: ['id'],
                  where: {
                      user_id: req.session.user_id
                  },
                  required: false
              }
          ],
      });

      if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
      }

      const post = postData.get({ plain: true });

      res.render('single-post', {
          post,
          logged_in: req.session.logged_in
      });

  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
