
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var passionReducer = require('../reducers/passionReducer.js');
var backgroundReducer = require('../reducers/backgroundReducer.js');


router.use(function(req, res, next){

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

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

      .post(jsonParser, function(req, res, err){
          var data = req.body;
          res.json(backgroundReducer(data));
      })



module.exports = router;
