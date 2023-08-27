const mongoose = require('mongoose');

// now we need to provide a connection to the database which is currently working on our local server and therefore we say local host
mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to Mongo DB"));

db.once('open', function(){
    console.log('Connected to database :: Mongo DB');
});

module.exports=db;