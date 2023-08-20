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

// to delete comments
// module.exports.destroy=function(req, res){
//     Comment.findById(req.params.id, function(err, comment){
//         if(comment.user == req.user.id){
//             // we need to find the post for which the comment has to be deleted
//             let postId = comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId, { $pull :{
//                 comments : req.params.id
//             }}, function(err, post){
//                 return res.redirect('back');
//             })
//         } else {
//             return res.redirect('back');
//         }
//     });
// }

// the above code does not work any more

module.exports.destroy = async function(req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (comment && comment.user.toString() === req.user.id.toString()) {
            const postId = comment.post;
            
            await comment.remove();
            
            await Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};
