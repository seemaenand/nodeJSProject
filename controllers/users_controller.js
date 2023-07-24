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