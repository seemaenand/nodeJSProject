const express = require('express');
const app = express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

app.use('/',require('./...routes/index'));

// now we need to tell them to use ejs as my view engine - set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// to start the server
app.listen(port, function(err){
    if(err){
        console.log(`Error : ${port}`);
    }
    console.log(`Server is running on port : ${port}`);
});