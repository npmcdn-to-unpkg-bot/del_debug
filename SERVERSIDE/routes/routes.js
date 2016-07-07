
var express = require('express');
var router = express.Router();

var passionReducer = require('../reducers/passionReducer.js');
var backgroundReducer = require('../reducers/backgroundReducer.js');


router.use(function(req, res, next){
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
