

const express = require('express')
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');
var path = require('path');


// create our app obj
const app = express()
// set the port to the port you are communicating with
app.set('port', 54323);
//

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname + '/public')));


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.get('/', function (req, res, next) {

    var context = {}
    context.title = 'About'
    context.description = 'For our adventurous pc gamers, we encourage you to explore this database and find what games are similar to your favorites in order to further expand your gaming library! Feel free to click on each tab to search games, make reviews, examine developers, explore genres, etc.'


    res.render('index', context);


});
// Gets the games page
app.get('/games', function (req, res, next) {

    var context = {}
    context.title = 'Video Games'
    context.description = 'This page will be for showing the video games that we have in the database'


    res.render('games', context);


});
// gets the review page
app.get('/reviews', function (req, res, next) {
    var context = {}
    context.title = 'Reviews'
    context.description = 'This page will be for showing the reviews that we have, plus adding some on'


    res.render('reviews', context);
});
// gets the dev page
app.get('/devs', function (req, res, next) {
    var context = {}
    context.title = 'Developers'
    context.description = 'This page shows the Developers. \n You can search for developers and update names if they change.'


    res.render('devs', context);
});
// get genres

app.get('/genres', function (req, res, next) {
    var context = {}
    context.title = 'Genres'
    context.description = 'This page shows different genres. This includes the Genre Name and whether multiplayer is possible for that game.'


    res.render('genres', context);
});

// error handler


// module.exports = app;
app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})