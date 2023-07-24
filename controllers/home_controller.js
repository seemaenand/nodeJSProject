module.exports.home=function(req,res){
    // return res.end('<h1>Express is up for running the controller</h1>');
    // now we want to render an ejs file

    return res.render('home', {
        title :"Home"
    });
};