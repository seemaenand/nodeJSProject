const express = require('express');
const router=express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create);
// create a route for deleting comments and posts
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports=router;