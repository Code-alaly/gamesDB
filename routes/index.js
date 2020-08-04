var express = require('express');
const mysql = require("../app");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    var context = {}
    context.title = 'About'
    context.description = 'For our adventurous pc gamers, we encourage you to explore this database and find what games are similar to your favorites in order to further expand your gaming library! Feel free to click on each tab to search games, make reviews, examine developers, explore genres, etc.'


    res.render('index', context);


});

router.get('/testin',function(req,res,next){
    var context = {};

                mysql.pool.query('SELECT * FROM Video_games', function(err, rows, fields){
                    results = rows
                    context.results = results
                    context.title = 'Test Database Page'
                    context.about = 'seeing how this goes'
                    res.render('testin',context);
                });
            });
//     });
// });

// Gets the games page
router.get('/games', function (req, res, next) {

    var context = {}
    context.title = 'Video Games'
    context.description = 'This page will be for showing the video games that we have in the database'


    res.render('games', context);


});
// gets the review page
router.get('/reviews', function (req, res, next) {
    var context = {}
    context.title = 'Reviews'
    context.description = 'This page will be for showing the reviews that we have, plus adding some on'


    res.render('reviews', context);
});
// gets the dev page
router.get('/devs', function (req, res, next) {
    var context = {}
    context.title = 'Developers'
    context.description = 'This page shows the Developers. \n You can search for developers and update names if they change.'


    res.render('devs', context);
});
// get genres

router.get('/genres', function (req, res, next) {
    var context = {}
    context.title = 'Genres'
    context.description = 'This page shows different genres. This includes the Genre name and a description.'


    res.render('genres', context);
});

// get games_genres

router.get('/games_genres', function (req, res, next) {
    var context = {}
    context.title = 'Games-Genres'
    context.description = 'This page shows video games and their corresponding genre(s).'


    res.render('games_genres', context);
});

// router.get('/test', function (req, res, next) {
//     var context = {}
//     context.title = 'Test'
//     context.description = 'This is a test page'
//
//
//     res.render('test', context);
// });

module.exports = router;
