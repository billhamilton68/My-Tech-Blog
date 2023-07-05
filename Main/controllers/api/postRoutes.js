
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

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
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/like', async (req, res) => {
  try {
      const newLike = await Like.create({
          user_id: req.body.userId,
          post_id: req.body.postId
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

module.exports = router;
