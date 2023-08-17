const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home );
// router.use('/users', require('./users'));
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
// the comments router has to be required
router.use('/comments', require('./comments'));

// console.log("Router is set");

module.exports=router;