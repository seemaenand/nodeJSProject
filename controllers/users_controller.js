module.exports.profile=function(req,res){
    // res.end('<h1>User profile</h1>');
    return res.render('users_profile', {
        title :"Profile"
    });
}

module.exports.post=function(req,res){
    // res.end('<h1>User post</h1>');
    return res.render('users_post', {
        title :"Post"
    });
}

// render the sign Up page
module.exports.signUp = function(req, res){
    return res.render('users_sign_up',{
        title : "Codeial | Sign Up"
    })
}

// render the sign In page
module.exports.signIn = function(req, res){
    return res.render('users_sign_in',{
        title : "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create=function(req, res){
    // to do later
}

//sign in and create a session for the user
module.exports.createSession=function(req, res){
    // to do later
}
