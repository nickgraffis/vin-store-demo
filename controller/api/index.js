const router = require('express').Router();
const userRoutes = require('./userRoutes');
const vinRoutes = require('./vinRoutes');

router.use('/users', userRoutes);
router.use('/vins', vinRoutes);

module.exports = router;