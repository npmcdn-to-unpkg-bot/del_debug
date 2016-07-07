
var express = require('express');
var router = express.Router();

var passionReducer = require('../reducers/passionReducer.js');
var backgroundReducer = require('../reducers/backgroundReducer.js');


router.use(function(req, res, next){

  var allowedOrigins = ['http://localhost:3333', 'https://explore-your-fit.herokuapp.com'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);

  console.log('something is happening!');
  next();
});


    router.route('/survey')

      .get(function(req, res){
        res.render('survey')
      })

      .post(function(req, res){
          var data = req.body
          res.json(passionReducer(data));
      })

    router.route('/background')
      .get(function(req, res){
        res.render('background')
      })

      .post(function(req, res){
          var data = req.body
          res.json(backgroundReducer(data));
      })



module.exports = router;
