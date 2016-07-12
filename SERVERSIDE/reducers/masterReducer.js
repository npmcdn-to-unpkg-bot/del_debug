var passionReducer = require('./passionReducer.js');
var backgroundReducer = require('./backgroundReducer.js');


module.exports = function masterReducer(clientResponses){


    console.log('firing MASTER Reducer.... COMPLETE RESPONSES:')
    console.log(clientResponses)
    var score = {
      audit: 0,
      consulting: 0,
      advisory: 0,
      tax: 0,
      financial: 0,
      federal: 0,
      public: 0,
      tech: 0,
      nontech: 0,
      modules: [],
      message1: '',
      message2: '',
      message3: ''
    };


    backgroundReducer(clientResponses.section1, score);
    passionReducer(clientResponses.section2, score);

    return score;
  }
