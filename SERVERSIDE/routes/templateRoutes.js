
var express = require('express');
var router = express.Router();

var request = require('superagent');

// bring in our custom WP converter module!!! :)
var WP = require('../utils/wp_converter.js');



var wp_pages_data = null;

request
  .get('https://deloitteeyf.wpengine.com/wp-json/wp/v2/pages?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC')
  .end(function(err, res){
    console.log('got data!')
    wp_pages_data = res.body;
  });


router.use(function(req, res, next){
  var pageName = req._parsedOriginalUrl.href.replace('/templates/', '').toUpperCase()
  console.log('Retreiving the ' + pageName + ' page!');
  next();
});

  router.route('/tax')

    .get(function(req, res){
      var taxPage = WP.getPage(wp_pages_data, 'slug', 'tax');
      res.render('templates/tax', WP.get_WP_data(taxPage));
    })

  router.route('/audit')

    .get(function(req, res){
      var auditPage = WP.getPage(wp_pages_data, 'slug', 'audit');
      res.render('templates/audit', WP.get_WP_data(auditPage));
    })

  router.route('/consulting')

    .get(function(req, res){
      var consultingPage = WP.getPage(wp_pages_data, 'slug', 'technology-consulting');
      res.render('templates/consulting', WP.get_WP_data(consultingPage));
    })

  router.route('/advisory')

    .get(function(req, res){
      var advisoryPage = WP.getPage(wp_pages_data, 'slug', 'advisory');
      res.render('templates/advisory', WP.get_WP_data(advisoryPage));
    })


module.exports = router;
