var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blockdemy Back-End Challenge', creator: 'Rafael Ochoa' });
});

module.exports = router;
