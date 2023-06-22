const router = require('express').Router();

// Import API routes
const apiRoutes = require('./api');

// Use the API routes when the path starts with "/api"
router.use('/api', apiRoutes);

// If you have additional routes such as "userRoutes" or "postRoutes" etc.
// you can include them here as well. For example:
// const userRoutes = require('./userRoutes');
// router.use('/users', userRoutes);

module.exports = router;