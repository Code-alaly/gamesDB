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

router.get('/testin', function (req, res, next) {
    var context = {};

    mysql.pool.query('SELECT * FROM Video_games', function (err, rows, fields) {
        results = rows
        context.results = results
        context.title = 'Test Database Page'
        context.about = 'seeing how this goes'
        res.render('testin', context);
    });
});


// Gets the games page
router.get('/games', function (req, res, next) {

    var context = {}

    context.title = 'Video Games'
    context.description = 'This page will be for showing the video games that we have in the database'
    res.render('games', context);

});

router.get('/all-games', function (req, res, next) {
    mysql.pool.query('SELECT * FROM Video_games', function (err, rows, fields) {
        if (err) {
            res.send(err)
        }
        res.send(rows)
    })
})

router.delete('/games-del', function (req, res, next) {
    query = `delete from Video_games where gameID = ${req.body.id}`
    mysql.pool.query(query, function (err, rows) {
        if (err) {
            console.log(err)
        }
    })
})


router.post('/games', (req, res, next) => {
        let body = req.body
        let name = body.name
        let copies = body.copies
        let year = body.year
        let values = "'" + name + "'," + copies + ',' + year
        let query = 'INSERT INTO Video_games(name, releaseYear, copiesSold) VALUES (' + values + ');'
        mysql.pool.query(query, function (error, rows) {
            if (error) {
                console.log(error)

            }

        })
    }
)
// gets the review page


router.get('/reviews', function (req, res, next) {
    var context = {}


    context.results = results
    context.title = 'Reviews'
    context.description = 'This page will be for showing the reviews that we have, plus adding some on'
    res.render('reviews', context);
});

router.get('all-reviews/', function (req, res, next) {
    mysql.pool.query('SELECT (SELECT name FROM Video_games WHERE Video_games.gameID = Reviews.gameID) as game, content, rating FROM Reviews', function (err, rows, fields) {
        if (err) {
            console.log(err)

        }
        res.send(rows)
    })
})
// gets the dev page

router.get('/devs', function (req, res, next) {
    var context = {}
    mysql.pool.query('SELECT (SELECT name FROM Video_games WHERE Video_games.gameID = Developers.gameID) as game, name, size FROM Developers', function (err, rows, fields) {
        results = rows
        context.results = results
        context.title = 'Developers'
        context.description = 'This page shows the Developers. \n You can search for developers and update names if they change.'
        res.render('devs', context);
    });
});



router.get('/genres', function (req, res, next) {
    var context = {}
    mysql.pool.query('SELECT * FROM Genres', function (err, rows, fields) {
        results = rows
        context.results = results
        context.title = 'Genres'
        context.description = 'This page shows different genres. This includes the Genre name and a description.'
        res.render('genres', context);
    });
});



router.get('/games_genres', function (req, res, next) {
    var context = {}
    mysql.pool.query('SELECT (SELECT name FROM Video_games WHERE Video_games.gameID = games_genres.gameID) as game, (SELECT name FROM Genres WHERE Genres.genreID = games_genres.genreID) as genre FROM games_genres', function (err, rows, fields) {
        results = rows
        context.results = results
        context.title = 'Games-Genres'
        context.description = 'This page shows video games and their corresponding genre(s).'
        res.render('games_genres', context);
    });
});



module.exports = router;
