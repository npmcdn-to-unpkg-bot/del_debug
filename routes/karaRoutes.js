
var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  var pageName = req._parsedOriginalUrl.href.replace('/templates/', '').toUpperCase()
  console.log('Retreiving the ' + pageName + ' page!');
  next();
});

  router.route('/tax')

    .get(function(req, res){
      res.render('templates/tax')
    })

  router.route('/audit')

    .get(function(req, res){
      res.render('templates/audit')
    })

  router.route('/consulting')

    .get(function(req, res){
      res.render('templates/consulting')
    })

  router.route('/advisory')

    .get(function(req, res){
      res.render('templates/advisory')
    })


module.exports = router;
