var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    var context = {}
    context.title = 'Video Games'
    context.description = 'This page will be for showing the video games that we have in the database'


    res.render('index', context);


});
router.get('/review', function (req, res, next) {
    var context = {}
    context.title = 'Reviews'
    context.description = 'This page will be for showing the reviews that we have, plus adding some on'


    res.render('review', context);
});

router.get('/dev', function (req, res, next) {
    var context = {}
    context.title = 'Developers'
    context.description = 'This page will be for showing the Developers that we have, I guess we need to be able to' +
        'remove them as well?'


    res.render('review', context);
});

module.exports = router;
