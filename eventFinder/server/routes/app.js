var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'CMS' });
  res.sendFile(path.join(__dirname, 'dist/eventFinder/index.html'));
});

module.exports = router;


