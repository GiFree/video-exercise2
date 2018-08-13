const express = require('express');

const router = express.Router();

router.use('/videos', require('./videos'));
router.use('/user', require('./user'));
router.use('/seed', require('./seed'));

module.exports = router;