// import mongoose
const mongoose = require('mongoose');

// lets create a schema 
const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    // comment belongs to user
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
},{
    // lets include timestamps
    timestamps : true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;