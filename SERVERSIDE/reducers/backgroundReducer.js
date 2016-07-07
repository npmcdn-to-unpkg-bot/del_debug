
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
      nontech: 0,
      message: ''
    }

      if (Boolean(backgroundResponses.question1)){

        var message;

        switch(backgroundResponses.question1) {

          // ******************************************
          // HANDLE SELECTIONS WITH "PROMPTED OPTIONS"

          case "Accounting":
          case "Taxation":
          case "Forensic Accounting":
            message = 'selected a "prompted option"..... Compiles to Accounting'
            console.log(message)
            score.message = message;
            score.audit ++;
            score.tax ++;
            score.advisory ++;
            break;

          case "Business Administration":
          case "Management":
          case "International Studies":
          case "Entrepreneurship":
          case "International Business":
          case "Supply Chain":
          case "Risk Management":
              message = 'selected a "prompted option"..... Compiles to Business Administration'
              console.log(message)
              score.message = message;
              score.audit ++;
              score.tax ++;
              score.consulting ++;
              score.advisory ++;
              break;

          case "Computer Information Systems":
          case "Information Technology":
            message = 'selected a "prompted option"..... Compiles to Computer Information Systems'
            console.log(message)
            score.message = message;
            score.consulting ++;
            score.advisory ++;
            break;

          case "Computer Science":
          case "Computer Engineering":
          case "Software Engineering":
          case "Web Development":
            message = 'selected a "prompted option"..... Compiles to Computer Science'
            console.log(message)
            score.message = message;
            score.consulting ++;
            score.advisory ++;
            break;

          case "Systems Engineering":
          case "Industrial Engineering":
          case "Electrical Engineering":
            message = 'selected a "prompted option"..... Compiles to Systems Engineering'
            console.log(message)
            score.message = message;
            score.consulting ++;
            score.advisory ++;
            break;


          case "Human Resources Management":
          case "Human Resources":
            message = 'selected a "prompted option"..... Compiles to Human Resources Management'
            console.log(message)
            score.message = message;
            score.tax ++;
            score.consulting ++;
            break;

          case "Marketing or Communications":
          case "Internet Marketing":
          case "Digital Marketing":
          case "Media Arts":
          case "Graphic Design":
            message = 'selected a "prompted option"..... Compiles to Marketing or Communications'
            console.log(message)
            score.message = message;
            score.consulting ++;
            score.advisory ++;
            break;


          // **********************************************************
          // HANDLE ALL OTHER SELECTIONS W/SAME OUTCOMES (ASSUMING EVENLY WEIGHTED POINT DISTRIBUTION)

          function logAnswer(){
            message = 'Chose ' + backgroundResponses.question1
            console.log(message)
            score.message = message;
          }

          case "Economics":
          case "Finance":
            logAnswer();
            score.audit ++;
            score.tax ++;
            score.consulting ++;
            score.advisory ++;
            break;

          case "Law":
            logAnswer();
            score.tax ++;
            score.advisory ++;
            break;

          case "Management Information Systems":
          case "Science":
          case "Math":
          case "Education":
            logAnswer();
            score.audit ++;
            score.consulting ++;
            score.advisory ++;
            break;

          case "Biology":
          case "Physics":
          case "Chemistry":
          case "English":
          case "Psychology":
          case "Social Science":
            logAnswer();
            score.consulting ++;
            score.advisory ++;
            break;

            }
          }

    return score;
}
