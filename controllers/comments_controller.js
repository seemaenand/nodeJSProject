// we need 2 models to be accessed - the comment and the post
const Comment = require('../models/comment');
const Post = require('../models/post');

// we need to find if the post in which the comments are posted exists
// module.exports.create=function(req,res){
// Post.findById(req.body.post, function(err, post){
//     // if the post if found
//     if(post){
//         Comment.create({
//             content : req.body.content,
//             post : req.body.post,
//             user : req.user._id
//         },
//         function(err, comment){
//             // handle error

//             // adding comment to the post
//             post.comments.push(comment);
//             // now we need to save in the database
//             post.save();

//             res.redirect('/');
//         }
//         );
//     }
// });
// }

// as Model.findById() no longer accepts a callback - the above code changed to below

module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // Adding comment to the post
            post.comments.push(comment);
            // Now we need to save in the database
            await post.save();

            res.redirect('/');
        }
    } catch (err) {
        // Handle error
        console.error(err);
        res.redirect('/');
    }
};
