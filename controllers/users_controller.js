const User = require('../models/users');

// module.exports.profile=function(req,res){
//     // res.end('<h1>User profile</h1>');
//     User.findById(req.params.id, function(err, user){
//         return res.render('users_profile', {
//             title :"Profile",
//             profile_user : user
//     })
    
//     });
// }

// above code to be replaced as below
module.exports.profile = async function(req, res){
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            return res.render('users_profile', {
                title: "Profile",
                profile_user: user
            });
        } else {
            return res.end('<h1>User not found</h1>');
        }
    } catch (err) {
        console.error(err);
        return res.end('<h1>Error in rendering user profile</h1>');
    }
};

module.exports.post=function(req,res){
    // res.end('<h1>User post</h1>');
    return res.render('users_post', {
        title :"Post"
    });
}

// render the sign Up page
module.exports.signUp = function(req, res){
    // we dont want to show the sign up and sign in page if user is already signed up 
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('users_sign_up',{
        title : "Codeial | Sign Up"
    })
}

// render the sign In page
module.exports.signIn = function(req, res){
     // we dont want to show the sign up and sign in page if user is already signed up 
     if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('users_sign_in',{
        title : "Codeial | Sign In"
    })
}

// get the sign up data
// module.exports.create=function(req, res){
//     // lets first check if password is not correct
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     // lets now check on email
//     User.findOne({
//         email : req.body.email}, function(err, user){
//             if(err){
//                 console.log('error in finding user in signing up');
//                 return;
//             }
            
//             if (!user){
//                 User.create(req.body, function(err, user){
//                     if(err){
//                         console.log('Error in creating user while signing up');
//                         return;
//                     }
//                     return res.redirect('/users/sign-in');
//                 })
//             } else {
//                 return res.redirect('back');
            
//         }
//     });
// }

// findOne cannot have a callback  - therefore the new code

module.exports.create = async function (req, res) {
    // Let's first check if the password is not correct
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        // Let's now check if the user with the given email exists
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            // If the user doesn't exist, create a new user
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in finding or creating user while signing up:', err);
        return res.redirect('back');
    }
};


//sign in and create a session for the user
module.exports.createSession=function(req, res){
    // now that we have set up passport and express-sessions and required it in the index.js
    return res.redirect('/');
}

module.exports.destroySession=function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
    //   added above as callback required
      res.redirect('/');
    });
  }
    