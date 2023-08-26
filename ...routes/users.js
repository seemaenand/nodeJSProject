const express = require('express');
const router=express.Router();
// import passport
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// we want the profile page to be accessible only when signed in so we edit the code in the next line
// router.get('/profile', usersController.profile);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/post', usersController.post);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);

// when we need to create a session, need to create a route
router.post('/create-session', passport.authenticate(
    'local', {failureRedirect : '/users/sign-in'},
    ),
    usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports=router;