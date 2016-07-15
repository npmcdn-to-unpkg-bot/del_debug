var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require( 'classnames' );

var Selector = require('./selectorField.js');
var AnswerSelector = require('./AnswerSelector-A-B.js');
var ScoreDisplay = require('./scoreDisplay.js')
var Checklist = require('./checklist.js')
var Progress = require('./progress-spinner');

require('../../node_modules/gsap/src/minified/TweenMax.min');
require('../../node_modules/gsap/src/uncompressed/utils/Draggable');



Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};


function getData(url, scope){
  $.ajax({
     url: url,
     type: 'GET',
     dataType: 'json',
     success: function(res) {

       // Set up our client-side "store" for this section's user responses
       var tempData = {section1: {}};
       for (var i = 1; i < res.length; i++){
         tempData.section1["question" + (i)] = {answer: null}
       }

       console.log('This is the client state: ', tempData)

       // CLIENT STATE === responses
       scope.setState({
         sectionOneData: res,
         responses: tempData
       })

       getSectionTwoData("https://deloitteeyf.staging.wpengine.com/wp-json/wp/v2/passionq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC", scope);
     }
   })
};


function getSectionTwoData(url, scope){
  console.log("section1 resp:" , scope.state.responses)
  $.ajax({
     url: url,
     type: 'GET',
     dataType: 'json',
     success: function(res) {

       // Set up our client-side "store" for this section's user responses
       var tempData = {section2: {}};
       for (var i = 1; i < res.length; i++){
         tempData.section2["question" + (i)] = {answer: null}
       }

       console.log('This is the client state: ', tempData)

       // jQuery merge objects
       var combinedResponses = $.extend({}, scope.state.responses, tempData);

       console.log("combined:" , combinedResponses)

       // CLIENT STATE === responses
       scope.setState({
         sectionTwoData: res,
         responses: combinedResponses
       })

       getSectionThreeData("https://deloitteeyf.staging.wpengine.com/wp-json/wp/v2/projectq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC", scope)
     }
   })
};


function getSectionThreeData(url, scope){
  $.ajax({
     url: url,
     type: 'GET',
     dataType: 'json',
     success: function(res) {

       // Set up our client-side "store" for this section's user responses
       var tempData = {section3: {}};
       for (var i = 1; i < res.length; i++){
         tempData.section3["question" + (i)] = {answer: null}
       }

       console.log('This is the client state: ', tempData)

       // jQuery merge objects
       var combinedResponses = $.extend({}, scope.state.responses, tempData);

       console.log("combined:" , combinedResponses)

       // CLIENT STATE === responses
       scope.setState({
         gotData: true,
         totalQuestions: scope.state.sectionOneData.concat(scope.state.sectionTwoData, res).length - 3,
         sectionThreeData: res,
         responses: combinedResponses
       })
     }
   })
};


function convertToScore(url, scope, data){

  var stringData = JSON.stringify(data);
   $.ajax({
      url: url,
      type: 'POST',
      contentType: "application/json",
      handleAs: "json",
      data: stringData,
      success: function(res) {
        scope.setState({
          score: res
        })
      }
    });
 };


// UTILITY *** puts each field from acf: {background_categories: {category_name: 'thing1'}...} into a std. array eg. ['thing1', 'thing2', ...]
function convertFromACF(input){
   var x = [];
   input.forEach(function(item, index){
     x.push(item.category_name)
   });
   return x;
}


var Survey = React.createClass({

  getInitialState: function(){
      return({
        question: 1,
        totalQuestions: null,
        hasBeenAnswered: false,
        score: {},
        gotData: false,
        sectionOneData: [],
        sectionTwoData: [],
        sectionThreeData: [],
        responses: {}
      })
  },

  componentDidMount: function(){
    var scope = this;
    var url = "https://deloitteeyf.staging.wpengine.com/wp-json/wp/v2/backgroundq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC";

    getData(url, scope);
  },

  handleNext: function(answer){

    // Log the user's response
    this.state.responses.section1["question" + this.state.question].answer = answer;

    var totalQuestionsTemp = this.state.sectionOneData.concat(this.state.sectionTwoData, this.state.sectionThreeData).length - 1

    // // NOT on the last question...
    if (this.state.question < (totalQuestionsTemp) ){
      console.log('you did not answer the last question yet')

        // Then, increment the question index
        this.setState({
          question: this.state.question + 1
        })

        // ON the last question....
      } else {
        console.log('you just answered the last question')
        var index = this.state.question
      };

      var scope = this;
      var url = "/api/survey";

      convertToScore(url, scope, this.state.responses);
    },


  handleSectionTwoNext: function(answer, index){

    // Log the user's response
    this.state.responses.section2["question" + index].answer = answer;

        // Then, increment the question index
        this.setState({
          question: this.state.question + 1
        })

      var scope = this;
      var url = "/api/survey";

      convertToScore(url, scope, this.state.responses);
    },

  handleBack: function(){
    if (this.state.question > 1){
      this.setState({
        question: this.state.question - 1
      })

      var index = this.state.question - 1
    }

  },

  render: function(){


    var questionIndex = this.state.question;
    var that = this;

    var questionToShow = () => {

      if(that.state.gotData){
        switch (true) {
          case (questionIndex === 1):
            return (
              <div>
                <h3>Q1 - Degree Selector ... adds points</h3>
                <Selector questionIndex={questionIndex}
                  handleNext={this.handleNext}
                  gotData={this.state.gotData}
                  data={this.state.sectionOneData}
                  titleCase={true}
                  sortAlphabetically={true}
                  clientAnswer={this.state.responses.section1.question1.answer}
                />
              </div>
            );
            break;

          case (questionIndex === 2):
            return (
              <div>
                <h3>Q2 - Education Selector ... adds modules</h3>
                <Selector questionIndex={questionIndex}
                  handleNext={this.handleNext}
                  gotData={this.state.gotData}
                  data={this.state.sectionOneData}
                  titleCase={false}
                  sortAlphabetically={false}
                  clientAnswer={this.state.responses.section1.question2.answer}
                />
              </div>
            );
            break;

          case (questionIndex === 3):
            var checklistData = convertFromACF(this.state.sectionOneData[3].acf.background_categories);
            return (
              <div>
                <h3>Q3 - Extras Selector ... adds points AND modules</h3>
                <Checklist handleNext={this.handleNext} data={checklistData} clientAnswer={this.state.responses.section1.question3.answer}/>;
              </div>
            );
            break;


          case (questionIndex > 3 && questionIndex < (that.state.sectionOneData.length + that.state.sectionTwoData.length - 1 )):
            var sectionTwoIndex = questionIndex - this.state.sectionOneData.length + 1;
            return <AnswerSelector choiceA={this.state.sectionTwoData[sectionTwoIndex].acf.passion_choice_a} choiceB={this.state.sectionTwoData[sectionTwoIndex].acf.passion_choice_b} questionIndex={sectionTwoIndex} totalQuestions={this.state.sectionTwoData.length - 1} answer={this.state.responses.section2["question" + sectionTwoIndex].answer} score={this.state.score} handleNext={this.handleSectionTwoNext}/>
            break;

          case (questionIndex >= (that.state.sectionOneData.length + that.state.sectionTwoData.length - 1)):
            return <div><h3>YOU ARE DONE WITH SECTIONS 1 AND 2</h3></div>
            break;

        }
      } else {
        return (
          <div>nodata</div>
        );
      }
    }

    return(
      <div>
        <p className='backBtn' onClick={this.handleBack}><i className='fa fa-arrow-circle-left'></i> back</p>
        <Progress questionIndex={questionIndex} totalQuestions={this.state.totalQuestions}/>
        {questionToShow()}
        <ScoreDisplay score={this.state.score} data={this.state.responses}/>
      </div>
    )
  }
});


ReactDOM.render(<Survey/>, document.getElementById('survey'));


if (module.hot) {
  module.hot.accept();
}
