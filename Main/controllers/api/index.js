const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
// ... (other route imports)

// Use the individual route files
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
// ... (other router uses)

module.exports = router;