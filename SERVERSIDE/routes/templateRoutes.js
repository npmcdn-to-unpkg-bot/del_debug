
var express = require('express');
var router = express.Router();

var request = require('superagent');

var testData = null;

request
  .get('https://deloitteeyf.wpengine.com/wp-json/wp/v2/pages?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC')
  .end(function(err, res){
    console.log('got data!')
    testData = res;
  });

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
      res.render('templates/audit', {
        pageData: testData
      })
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
