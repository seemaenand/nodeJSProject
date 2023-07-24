const express = require('express');
const app = express();

const port = 8000;

app.use('/',require('./...routes/index'));

// to start the server
app.listen(port, function(err){
    if(err){
        console.log(`Error : ${port}`);
    }
    console.log(`Server is running on port : ${port}`);
});