// import mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // lets create the schema
    email:{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    // to ensure the created on and updated on is stored too
    timestamps:true
});

// now lets tell mongoose that above is a Schema
const User = mongoose.model('User', userSchema);

// lets export it now
module.exports = User;