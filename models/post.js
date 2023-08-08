// import mongoose
const mongoose = require('mongoose');

// for creating a schema
const postSchema = new mongoose.Schema({
    // this schema will have the following fields
    content : {
        type : String,
        required : true
    },
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},
{
    // add timestamps
    timestamps : true
});

// now we need to export this but before that we need to tell that it is a model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;