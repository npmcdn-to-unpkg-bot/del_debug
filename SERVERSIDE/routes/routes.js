
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var masterReducer = require('../reducers/masterReducer.js');


router.use(function(req, res, next){

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  console.log('something is happening!');
  next();
});


    router.route('/survey')

      .get(function(req, res){
        var err = {
          status: 'error code 1337...',
          stack: 'please use /api/background instead'
        }

        res.render('error', {
          message: ('This page has been disabled').toUpperCase(),
          error: err,
          redirect: {url: '/api/background'}
        });
      })

      .post(function(req, res){
          var data = req.body
          res.json(masterReducer(data));
      })

    router.route('/background')
      .get(function(req, res){
        res.render('background')
      })


module.exports = router;
