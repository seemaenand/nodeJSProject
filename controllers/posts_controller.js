// import post Schema
const Post = require('../models/post');

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