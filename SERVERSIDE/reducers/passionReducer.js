
module.exports = function passionReducer(surveyResponses){

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

      if (Boolean(surveyResponses.question1)){
          if (surveyResponses.question1 === 'true'){
            score.advisory ++;
            score.audit ++;
            score.tech ++;
          } else {
            score.consulting ++;
            score.tax ++;
          };
        }

      if (Boolean(surveyResponses.question2)){
          if (surveyResponses.question2 === 'true'){
            score.advisory ++;
            score.audit ++;
            score.tech ++;
          } else {
            score.consulting ++;
            score.tax ++;
          }
        }

      if (Boolean(surveyResponses.question3)){
          if (surveyResponses.question3 === 'true'){
            score.advisory ++;
            score.audit ++;
            score.tax ++;
          } else {
            score.consulting ++;
          }
        }

      if (Boolean(surveyResponses.question4)){
          if (surveyResponses.question4 === 'true'){
            score.tech ++;
          } else {
            score.nontech ++;
          }
        }


      if (Boolean(surveyResponses.question5)){
          if (surveyResponses.question5 === 'true'){
            score.tax ++;
            score.audit ++;
            score.federal ++;
          } else {
            score.consulting ++;
            score.advisory ++;
          }
        }

      if (Boolean(surveyResponses.question6)){
          if (surveyResponses.question6 === 'true'){
            score.tax ++;
            score.audit ++;
            score.federal ++;
          } else {
            score.consulting ++;
            score.advisory ++;
          }
        }

      if (Boolean(surveyResponses.question7)){
          if (surveyResponses.question7 === 'true'){
            score.tax ++;
            score.consulting ++;
          } else {
            score.advisory ++;
            score.audit ++;
          }
        }

      if (Boolean(surveyResponses.question8)){
          if (surveyResponses.question8 === 'true'){
            score.advisory ++;
            score.audit ++;
            score.federal ++;
          } else {
            score.consulting ++;
            score.tax ++;
          }
        }

    return score;
}
