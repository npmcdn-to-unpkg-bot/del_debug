
module.exports = function passionReducer(passionResponses, score){

      console.log('firing passionReducer.... PASSION RESPONSES:')
      console.log(passionResponses);

      if (passionResponses.question1.answer != null){

          if (passionResponses.question1.answer === true){
            console.log('question1 TRUE')
            score.advisory ++;
            score.audit ++;
            score.tech ++;
          } else {
            console.log('question1 FALSE')
            score.consulting ++;
            score.tax ++;
          };
        }

      if (passionResponses.question2.answer != null){

          if (passionResponses.question2.answer === true){
            console.log('question2 TRUE')
            score.advisory ++;
            score.audit ++;
            score.tech ++;
          } else {
            console.log('question2 FALSE')
            score.consulting ++;
            score.tax ++;
          }
        }

      if (passionResponses.question3.answer != null){

          if (passionResponses.question3.answer === true){
            console.log('question3 TRUE')
            score.advisory ++;
            score.audit ++;
            score.tax ++;
          } else {
            console.log('question3 FALSE')
            score.consulting ++;
          }
        }

      if (passionResponses.question4.answer != null){

          if (passionResponses.question4.answer === true){
            console.log('question TRUE')
            score.tech ++;
          } else {
            score.nontech ++;
          }
        }


      if (passionResponses.question5.answer != null){

          if (passionResponses.question5.answer === true){
            console.log('question TRUE')
            score.tax ++;
            score.audit ++;
            score.federal ++;
          } else {
            score.consulting ++;
            score.advisory ++;
          }
        }

      if (passionResponses.question6.answer != null){

          if (passionResponses.question6.answer === true){
            console.log('question TRUE')
            score.tax ++;
            score.audit ++;
            score.federal ++;
          } else {
            score.consulting ++;
            score.advisory ++;
          }
        }

      if (passionResponses.question7.answer != null){

          if (passionResponses.question7.answer === true){
            console.log('question TRUE')
            score.tax ++;
            score.consulting ++;
          } else {
            score.advisory ++;
            score.audit ++;
          }
        }

      if (passionResponses.question8.answer != null){

          if (passionResponses.question8.answer === true){
            console.log('question TRUE')
            score.advisory ++;
            score.audit ++;
            score.federal ++;
          } else {
            score.consulting ++;
            score.tax ++;
          }
        }
}
