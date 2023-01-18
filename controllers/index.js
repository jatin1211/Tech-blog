const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const postRoutes = require('./post-routes');
const editPostRoutes = require('./edit-posts');

//defining all home route  9 endpoints
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/posts', postRoutes);
router.use('/edit-posts',editPostRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;