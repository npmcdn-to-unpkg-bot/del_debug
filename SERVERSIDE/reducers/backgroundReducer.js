
module.exports = function backgroundReducer(backgroundResponses, score){

  console.log('firing backgroundReducer.... BACKGROUND RESPONSES:')
  console.log(backgroundResponses)

      if (Boolean(backgroundResponses.question1.answer)){

        switch (backgroundResponses.question1.answer) {

          // ******************************************
          // HANDLE SELECTIONS WITH 'PROMPTED OPTIONS'

          case 'Accounting':
          case 'Taxation':
          case 'Forensic Accounting':
            score.message1 = 'selected a \'prompted option\'..... Compiles to Accounting';
            score.audit ++;
            score.tax ++;
            score.advisory ++;
            break;

          case 'Business Administration':
          case 'Management':
          case 'International Studies':
          case 'Entrepreneurship':
          case 'International Business':
          case 'Supply Chain':
          case 'Risk Management':
              score.message1 = 'selected a \'prompted option\'..... Compiles to Business Administration';
              score.audit ++;
              score.tax ++;
              score.consulting ++;
              score.advisory ++;
              break;

          case 'Computer Information Systems':
          case 'Information Technology':
            score.message1 = 'selected a \'prompted option\'..... Compiles to Computer Information Systems - triggered Tech focus';
            score.consulting ++;
            score.advisory ++;
            score.tech += 50;
            break;

          case 'Computer Science':
          case 'Computer Engineering':
          case 'Software Engineering':
          case 'Web Development':
            score.message1 = 'selected a \'prompted option\'..... Compiles to Computer Science - triggered Tech focus';
            score.consulting ++;
            score.advisory ++;
            score.tech += 50;
            break;

          case 'Systems Engineering':
          case 'Industrial Engineering':
          case 'Electrical Engineering':
            score.message1 = 'selected a \'prompted option\'..... Compiles to Systems Engineering - triggered Tech focus';
            score.consulting ++;
            score.advisory ++;
            score.tech += 50;
            break;


          case 'Human Resources Management':
          case 'Human Resources':
            score.message1 = 'selected a \'prompted option\'..... Compiles to Human Resources Management';
            score.tax ++;
            score.consulting ++;
            break;

          case 'Marketing or Communications':
          case 'Internet Marketing':
          case 'Digital Marketing':
          case 'Media Arts':
          case 'Graphic Design':
            score.message1 = 'selected a \'prompted option\'..... Compiles to Marketing or Communications';
            score.consulting ++;
            score.advisory ++;
            score.modules.push('enabledServices');
            break;


          // **********************************************************
          // HANDLE ALL OTHER SELECTIONS W/SAME OUTCOMES (ASSUMING EVENLY WEIGHTED POINT DISTRIBUTION)

          function logAnswer1(){
            message = 'Chose ' + backgroundResponses.question1.answer
            score.message1 = message;
          }

          case 'Economics':
          case 'Finance':
            logAnswer1();
            score.audit ++;
            score.tax ++;
            score.consulting ++;
            score.advisory ++;
            break;

          case 'Law':
            logAnswer1();
            score.tax ++;
            score.advisory ++;
            break;

          case 'Management Information Systems':
            logAnswer1();
            score.audit ++;
            score.consulting ++;
            score.advisory ++;
            break;

          case 'Science':
          case 'Math':
          case 'Education':
            logAnswer1();
            score.audit ++;
            score.consulting ++;
            score.advisory ++;
            score.modules.push('enabledServices');
            break;

          case 'Biology':
          case 'Physics':
          case 'Chemistry':
          case 'English':
          case 'Psychology':
          case 'Social Science':
            logAnswer1();
            score.consulting ++;
            score.advisory ++;
            score.modules.push('enabledServices')
            break;

            }
          }

      if (Boolean(backgroundResponses.question2.answer)){

        var message;

        function logAnswer2(){
          message = 'Chose ' + backgroundResponses.question2.answer
          score.message2 = message;
        }

        switch (backgroundResponses.question2.answer) {

          case 'I\'m a freshman':
          case 'I\'m a sophomore':
          case 'I\'m a junior':
            logAnswer2();
            score.modules.push('FSJ');
            break;

          case 'I\'m a senior':
            logAnswer2();
            score.modules.push('Senior');
            break;

          case 'I\'m a graduate student':
            logAnswer2();
            score.modules.push('advancedDegrees');
            break;

          case 'I\'ve completed my education':
            logAnswer2();
            score.modules.push('completedSchool');
            break;

            }
          }

      if (Boolean(backgroundResponses.question3.answer)){

        var message;

        function logAnswer3(){
          message = 'Chose ' + backgroundResponses.question3.answer.join(' and ')
          score.message3 = message;
        }

          if (backgroundResponses.question3.answer.indexOf('Certified Public Accountant') != -1){
            logAnswer3();
            score.audit ++;
            score.tax ++;
          }

          if (backgroundResponses.question3.answer.indexOf('Juris Doctor or Master of Laws') != -1){
            logAnswer3();
            score.tax ++;
          }

          if (backgroundResponses.question3.answer.indexOf( 'Master of Accounting') != -1){
            logAnswer3();
            score.tax ++;
            score.audit ++;
            score.advisory ++;
          }

          if (backgroundResponses.question3.answer.indexOf( 'Master of Taxation') != -1){
            logAnswer3();
            score.tax ++;
            score.audit ++;
          }

          if (backgroundResponses.question3.answer.indexOf( 'Master of Business Administration') != -1){
            logAnswer3();
            score.consulting ++;
            score.advisory ++;
            score.modules.push('advancedBusinessDegree');
          }

          if (backgroundResponses.question3.answer.indexOf( 'Master of Health Administration') != -1){
            logAnswer3();
            score.consulting ++;
            score.advisory ++;
            score.modules.push('advancedHealthDegree');
          }

          if (backgroundResponses.question3.answer.indexOf( 'Master of Public Administration or Policy') != -1){
            logAnswer3();
            score.federal ++;
            score.modules.push('advancedPolicyDegree');
          }

          if (backgroundResponses.question3.answer.indexOf( 'Technology field concentration, second degree or master\’s') != -1){
            logAnswer3();
            score.tech ++;
            score.modules.push('advancedTechDegree');
          }

          if (backgroundResponses.question3.answer.indexOf( 'Financial field concentration, second degree or master\’s') != -1){
            logAnswer3();
            score.nontech ++;
            score.modules.push('advancedFinanceDegree');
          }


          if (backgroundResponses.question3.answer.indexOf( 'Science or engineering field concentration, second degree or master\’s') != -1){
            logAnswer3();
            score.consulting ++;
            score.advisory ++;
          }


          if (backgroundResponses.question3.answer.indexOf( 'Other concentration, second degree or master\’s') != -1){
            logAnswer3();
            score.consulting ++;
            score.advisory ++;
          }

          if (backgroundResponses.question3.answer.indexOf( 'No / Don\'t plan to at this time') != -1){
            logAnswer3();
          }
        }

}
