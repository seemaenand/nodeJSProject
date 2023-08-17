const Post = require('../models/post');

// module.exports.home=function(req,res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);
//     // return res.end('<h1>Express is up for running the controller</h1>');
//     // now we want to render an ejs file

//     // lets find all the posts
//     Post.find({}
// .populate('user')
// .populate(
//     {
//         path : 'comments',
//         populate : {
//             path : 'user'
//         }
//     }
// )
// .exec(function(err, posts){
//         return res.render('home', {
//             title :"Codeial || Home",
//             posts : posts
//         });
//     });

//     // return res.render('home', {
//     //     title :"Home"
//     // });
// };

// the above post no longer accepts callback so below code

module.exports.home = async function(req, res) {
    try {
        // Uncomment these lines if you want to manipulate cookies
        // console.log(req.cookies);
        // res.cookie('user_id', 25);

        // Uncomment this line if you want to send a simple HTML response
        // return res.end('<h1>Express is up for running the controller</h1>');

        // Now we want to render an EJS file

        // Let's find all the posts using async/await
        const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec();

        return res.render('home', {
            title: "Codeial || Home",
            posts: posts
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// basic syntax here is module.exports.actionName=function(req, res){}