var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/reviews', function(req, res, next) {
  res.render('index', { title: 'Reviews' });
});

module.exports = router;
