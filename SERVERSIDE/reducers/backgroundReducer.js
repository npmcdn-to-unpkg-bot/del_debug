
module.exports = function backgroundReducer(backgroundResponses){

  console.log('firing backgroundReducer')

  console.log(backgroundResponses)

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
    }

      if (Boolean(backgroundResponses.question1)){

        switch(backgroundResponses.question1) {

          // ******************************************
          // HANDLE SELECTIONS WITH "PROMPTED OPTIONS"

          case "Accounting":
          case "Taxation":
          case "Forensic Accounting":
            score.message1 = 'selected a "prompted option"..... Compiles to Accounting';
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
              score.message1 = 'selected a "prompted option"..... Compiles to Business Administration';
              score.audit ++;
              score.tax ++;
              score.consulting ++;
              score.advisory ++;
              break;

          case "Computer Information Systems":
          case "Information Technology":
            score.message1 = 'selected a "prompted option"..... Compiles to Computer Information Systems - triggered Tech focus';
            score.consulting ++;
            score.advisory ++;
            score.tech += 50;
            break;

          case "Computer Science":
          case "Computer Engineering":
          case "Software Engineering":
          case "Web Development":
            score.message1 = 'selected a "prompted option"..... Compiles to Computer Science - triggered Tech focus';
            score.consulting ++;
            score.advisory ++;
            score.tech += 50;
            break;

          case "Systems Engineering":
          case "Industrial Engineering":
          case "Electrical Engineering":
            score.message1 = 'selected a "prompted option"..... Compiles to Systems Engineering - triggered Tech focus';
            score.consulting ++;
            score.advisory ++;
            score.tech += 50;
            break;


          case "Human Resources Management":
          case "Human Resources":
            score.message1 = 'selected a "prompted option"..... Compiles to Human Resources Management';
            score.tax ++;
            score.consulting ++;
            break;

          case "Marketing or Communications":
          case "Internet Marketing":
          case "Digital Marketing":
          case "Media Arts":
          case "Graphic Design":
            score.message1 = 'selected a "prompted option"..... Compiles to Marketing or Communications';
            score.consulting ++;
            score.advisory ++;
            score.modules.push('enabledServices');
            break;


          // **********************************************************
          // HANDLE ALL OTHER SELECTIONS W/SAME OUTCOMES (ASSUMING EVENLY WEIGHTED POINT DISTRIBUTION)

          function logAnswer1(){
            message = 'Chose ' + backgroundResponses.question1
            console.log(message)
            score.message1 = message;
          }

          case "Economics":
          case "Finance":
            logAnswer1();
            score.audit ++;
            score.tax ++;
            score.consulting ++;
            score.advisory ++;
            break;

          case "Law":
            logAnswer1();
            score.tax ++;
            score.advisory ++;
            break;

          case "Management Information Systems":
            logAnswer1();
            score.audit ++;
            score.consulting ++;
            score.advisory ++;
            break;

          case "Science":
          case "Math":
          case "Education":
            logAnswer1();
            score.audit ++;
            score.consulting ++;
            score.advisory ++;
            score.modules.push('enabledServices');
            break;

          case "Biology":
          case "Physics":
          case "Chemistry":
          case "English":
          case "Psychology":
          case "Social Science":
            logAnswer1();
            score.consulting ++;
            score.advisory ++;
            score.modules.push('enabledServices')
            break;

            }
          }

      if (Boolean(backgroundResponses.question2)){

        var message;

        function logAnswer2(){
          message = 'Chose ' + backgroundResponses.question2
          console.log(message)
          score.message2 = message;
        }

        switch(backgroundResponses.question2) {

          case "I\'m a freshman":
          case "I\'m a sophomore":
          case "I\'m a junior":
            logAnswer2();
            score.modules.push('FSJ');
            break;

          case "I\'m a senior":
            logAnswer2();
            score.modules.push('Senior');
            break;

          case "I\'m a graduate student":
            logAnswer2();
            score.modules.push('advancedDegrees');
            break;

          case "I\'ve completed my education":
            logAnswer2();
            score.modules.push('completedSchool');
            break;

            }
          }

      if (Boolean(backgroundResponses.question3)){

        console.log('****** ENTERED QUESTION 3 ******')
        console.log('sent this array: ' , backgroundResponses.question3 )


        var message;

        function logAnswer3(){
          message = 'Chose ' + backgroundResponses.question3.join(' and ')
          console.log(message)
          score.message3 = message;
        }

          if (backgroundResponses.question3.includes("Certified Public Accountant")){
            console.log('ENTERED the CPA hook')
            logAnswer3();
            score.audit ++;
            score.tax ++;
          }

          if (backgroundResponses.question3.includes("Juris Doctor or Master of Laws")){
            logAnswer3();
            score.tax ++;
          }

          if (backgroundResponses.question3.includes( "Master of Accounting")){
            logAnswer3();
            score.tax ++;
            score.audit ++;
            score.advisory ++;
          }

          if (backgroundResponses.question3.includes( "Master of Taxation")){
            logAnswer3();
            score.tax ++;
            score.audit ++;
          }

          if (backgroundResponses.question3.includes( "Master of Business Administration")){
            logAnswer3();
            score.consulting ++;
            score.advisory ++;
            score.modules.push('advancedBusinessDegree');
          }

          if (backgroundResponses.question3.includes( "Master of Health Administration")){
            logAnswer3();
            score.consulting ++;
            score.advisory ++;
            score.modules.push('advancedHealthDegree');
          }

          if (backgroundResponses.question3.includes( "Master of Public Administration or Policy")){
            logAnswer3();
            score.federal ++;
            score.modules.push('advancedPolicyDegree');
          }

          if (backgroundResponses.question3.includes( "Technology field concentration, second degree or master\’s")){
            logAnswer3();
            score.tech ++;
            score.modules.push('advancedTechDegree');
          }

          if (backgroundResponses.question3.includes( "Financial field concentration, second degree or master\’s")){
            logAnswer3();
            score.financial ++;
            score.modules.push('advancedFinanceDegree');
          }


          if (backgroundResponses.question3.includes( "Science or engineering field concentration, second degree or master\’s")){
            logAnswer3();
            score.consulting ++;
            score.advisory ++;
          }


          if (backgroundResponses.question3.includes( "Other concentration, second degree or master\’s")){
            logAnswer3();
            score.consulting ++;
            score.advisory ++;
          }

          if (backgroundResponses.question3.includes( "No / Don't plan to at this time")){
            logAnswer3();
          }
        }

    return score;
}
