
var express = require('express');
var router = express.Router();

var passionReducer = require('../reducers/passionReducer.js');

var monsterVar = 'SHARKICORN';

router.use(function(req, res, next){
  console.log('something is happeneing!');
  next();
});

  router.route('/datamonster')

    .get(function(req, res){
      res.json({monster: monsterVar})
    })

    .post(function(req, res){
      monsterVar = req.body.newMonster
      res.json({monster: monsterVar})
    })


    router.route('/survey')

      .get(function(req, res){
        res.render('survey')
      })

      .post(function(req, res){
          var data = req.body
          res.json(passionReducer(data));
      })



module.exports = router;
