
var express = require('express');
var router = express.Router();

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


module.exports = router;
