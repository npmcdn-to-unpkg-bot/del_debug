
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
        switch(backgroundResponses.question1) {

          case "Accounting":
          case "Taxation":
          case "Forensic Accounting":
            console.log('selected a "prompted option" .....')
            console.log('Chose Accounting')
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
            console.log('selected a "prompted option" .....')
              console.log('Business Administration')
              score.audit ++;
              score.tax ++;
              score.consulting ++;
              score.advisory ++;
              break;

          case "Computer Information Systems":
          case "Information Technology":
            console.log('selected a "prompted option" .....')
            console.log('Chose Computer Information Systems')
            score.consulting ++;
            score.advisory ++;
            break;

          case "Computer Science":
          case "Computer Engineering":
          case "Software Engineering":
          case "Web Development":
            console.log('selected a "prompted option" .....')
            console.log('Chose Computer Science')
            score.consulting ++;
            score.advisory ++;
            break;


          case "Economics":
          case "Finance":
            console.log('Chose' + backgroundResponses.question1)
            score.audit ++;
            score.tax ++;
            score.consulting ++;
            score.advisory ++;
            break;



          case "Systems Engineering":
          case "Industrial Engineering":
          case "Electrical Engineering":
            console.log('selected a "prompted option" .....')
            console.log('Chose Systems Engineering')
            score.consulting ++;
            score.advisory ++;
            break;


          case "Human Resources Management":
          case "Human Resources":
            console.log('selected a "prompted option" .....')
            console.log('Chose Human Resources Management')
            score.tax ++;
            score.consulting ++;
            break;


          case "Law":
            console.log('Chose Law')
            score.tax ++;
            score.advisory ++;
            break;

          case "Management Information Systems":
            console.log('Chose Management Information Systems')
            score.audit ++;
            score.consulting ++;
            score.advisory ++;
            break;

          case "Marketing or Communications":
          case "Internet Marketing":
          case "Digital Marketing":
          case "Media Arts":
          case "Graphic Design":
            console.log('selected a "prompted option" .....')
            console.log('Chose Marketing or Communications')
            score.consulting ++;
            score.advisory ++;
            break;

          case "Science":
            console.log('Chose Science')
            score.consulting ++;
            score.audit ++;
            score.advisory ++;
            break;

          case "Math":
          case "Education":
            console.log('Chose' + backgroundResponses.question1)
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
            console.log('Chose' + backgroundResponses.question1)
            score.consulting ++;
            score.advisory ++;
            break;






            }
          }

    return score;
}
