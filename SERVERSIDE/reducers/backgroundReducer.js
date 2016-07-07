
module.exports = function passionReducer(backgroundResponses){

  console.log('firing backgroundReducer')

  console.log(backgroundResponses)

    var score = {
      audit: 0,
      consulting: 0,
      advisory: 0,
      tax: 0,
      federal: 0,
      public: 0,
      tech: 0,
      nontech: 0
    }

      if (Boolean(backgroundResponses.question1)){
        console.log('question1 passed')
        switch(backgroundResponses.question1) {

          case "Business Administration":
          case "Management":
          case "International Studies":
          case "Entrepreneurship":
          case "International Business":
          case "Supply Chain":
          case "Risk Management":
              console.log('question1 switch passed')
              score.audit ++;
              score.tax ++;
              score.consulting ++;
              score.advisory ++;
              break;

            }
          }

    return score;
}
