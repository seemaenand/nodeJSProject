const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');


//used for session cookie
// setting up express-session for use
const session = require('express-session');

// lets also require passport and the local strategy 
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// define mongo store
const MongoStore = require('connect-mongo');
// lets require node-sass
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// lets put some settings for the sass. we need to do this before starting the server
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());

// setting up the cookie parser
app.use(cookieParser());

// we need to tell the index from where to get the static files i.e. the css, js and images file
app.use(express.static('./assets'));

app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// app.use('/',require('./...routes/index'));

// now we need to tell them to use ejs as my view engine - set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// middleware which takes in the session cookie and encrypts it (using express-session/passport)

app.use(session({
    // there are some properties that need to be set
    name :'codeial',
    // TODO - change the secret type before deployment in production mode. 
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    // now we need to mention the time the cookie expires
    cookie:{
        maxAge :(1000*60*100)
        // this is summed up in minutes therefore the conversion from milliseconds
    },
    // mongo store is used to store the session cookie in the db
    store : new MongoStore({
        // mongooseConnection : db, - this does not work so changing to below
        mongoUrl : "mongodb://127.0.0.1/codeial", 
        autoremove : 'disabled'
    },
    // call back function in case the connection is not established
    function(err){
        console.log(err || 'connect - mongodb setup ok');
    }
    )
}));

// we need to now tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

// lets set up the current users usage
app.use(passport.setAuthenticatedUser);

// lets set us connect-flash
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require('./...routes/index'));

// to start the server
app.listen(port, function(err){
    if(err){
        console.log(`Error : ${port}`);
    }
    console.log(`Server is running on port : ${port}`);
});