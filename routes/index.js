var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    var context = {}
    context.title = 'About'
    context.description = 'For our adventurous pc gamers, we encourage you to explore this database and find what games are similar to your favorites in order to further expand your gaming library! Feel free to click on each tab to search'


    res.render('index', context);


});
// Gets the games page
router.get('/games', function (req, res, next) {

    var context = {}
    context.title = 'Video Games'
    context.description = 'This page will be for showing the video games that we have in the database'


    res.render('games', context);


});
// gets the review page
router.get('/review', function (req, res, next) {
    var context = {}
    context.title = 'Reviews'
    context.description = 'This page will be for showing the reviews that we have, plus adding some on'


    res.render('review', context);
});
// gets the dev page
router.get('/dev', function (req, res, next) {
    var context = {}
    context.title = 'Developers'
    context.description = 'This page will be for showing the Developers that we have, I guess we need to be able to' +
        'remove them as well?'


    res.render('review', context);
});
// get genres

router.get('/genres', function (req, res, next) {
    var context = {}
    context.title = 'Genres'
    context.description = 'This page will be for showing the Genres that we have.'


    res.render('review', context);
});

module.exports = router;
