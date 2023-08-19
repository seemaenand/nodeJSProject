// import post Schema
const Post = require('../models/post');
const Comment = require('../models/comment');

// module.exports.create=function(req, res){
//     Post.create({
//         content:req.body.content,
//         user:req.user._id
//     }, function(err, post){
//         if(err){
//             console.log('Error in creating a post');
//             return;
//         }
//         return res.redirect('back');
//     });
// }
// the above code does not work so replacing with below

module.exports.create = async function (req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        console.log('Post created:', post);
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating a post:', err);
        return;
    }
};

// create an action to delete posts

module.exports.destroy = function(req, res){
    // we need to first check if the user logged in is actually the user of the post
    Post.findById(req.params.id, function(err, post){
        // if it is the user of the post and we get the post
        // .id means converting the object id to string

        if(post.user == req.user.id){
            post.remove();
            // next we delete the comments of that particular post
            Comment.deleteMany({
                post : req.param.id
            }, function(err){
                return res.redirect('back');
            });

        }
        // but what if the user does not match
        else{
            return res.redirect('back');
        }
    });
}