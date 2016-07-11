var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require( 'classnames' );

var Selector = require('./selectorField.js');
var Progress = require('./progress-spinner');

var Checkbox = require('rc-checkbox');

function getSectionOneData(url, scope){
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
         gotData: true,
         sectionOneData: res,
         responses: tempData
       })
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

var ExtraDegreesChecklist = React.createClass({
  getInitialState: function(){
    return({
      selectedAnswers: []
    })
  },

  render: function(){

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

    var that = this;
    function checkHandler(e){
      if (e.target.checked) {
        var tempArray = that.state.selectedAnswers;
        tempArray.push(e.target.name)
        that.setState({
          selectedAnswers: tempArray
        })
      } else {
        var tempArray = that.state.selectedAnswers;
        tempArray.remove(e.target.name)
        that.setState({
          selectedAnswers: tempArray
        })
      }
    };

    var checkBoxes = this.props.data[3].acf.background_categories.map(function(element){
      return(
        <li>
          <label>
           {element.category_name} &nbsp;
           <Checkbox
             name={element.category_name}
             onChange={checkHandler}
           />
         </label>
       </li>
      )
    })

    return (
      <div>
        <h3>Q3 - Extras Selector ... adds points AND modules</h3>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <ul>
          {checkBoxes}
          </ul>
        </div>
        <div className="col-md-3"></div>
        <button onClick={() => this.props.handleNext(this.state.selectedAnswers)}>NEXT</button>
      </div>
    )
  }

});

var ScoreDisplay = React.createClass({

  render: function(){

    var indicator = this.props.score.message1 ? this.props.score.message1 : <p>no response yet</p>
    var indicator2 = this.props.score.message2 ? this.props.score.message2 : <p>no response yet</p>
    var indicator3 = this.props.score.message3 ? this.props.score.message3 : <p>no response yet</p>

    // SET UP DEBUGGING INDICATOR FOR MODULES
    var modules;
    if (this.props.score.modules && this.props.score.modules[0]){
      modules = this.props.score.modules.map(function(element){return(<li>{element}</li>)})
    } else {
      modules = <p>no modules </p>
    }

    return(
      <div className='row'>
        <div className="col-md-12 text-center"><h4>{indicator} <i>(Q1 response)</i></h4></div>
        <div className="col-md-12 text-center"><h4>{indicator2} <i>(Q2 response)</i></h4></div>
        <div className="col-md-12 text-center"><h4>{indicator3} <i>(Q3 response)</i></h4></div>
        <div className='col-md-4'>
          <h2>CORE AREAS</h2>
          <div><h4 style={{display: 'inline-block'}}>AUDIT</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.audit}</p></div>
          <div><h4 style={{display: 'inline-block'}}>ADVISORY</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.advisory}</p></div>
          <div><h4 style={{display: 'inline-block'}}>CONSULTING</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.consulting}</p></div>
          <div><h4 style={{display: 'inline-block'}}>TAX</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.tax}</p></div>
        </div>
        <div className='col-md-4'>
          <h2>FOCUS AREAS</h2>
          <div><h4 style={{display: 'inline-block'}}>TECH</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.tech}</p></div>
          <div><h4 style={{display: 'inline-block'}}>NON-TECH</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.nontech}</p></div>
          <div><h4 style={{display: 'inline-block'}}>FEDERAL</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.federal}</p></div>
          <div><h4 style={{display: 'inline-block'}}>PUBLIC</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.public}</p></div>
        </div>
        <div className='col-md-4'>
          <h2>MODULES</h2>
          <ul>
            {modules}
          </ul>
        </div>
      </div>
    )
  }
});


var Survey = React.createClass({

  getInitialState: function(){
      return({
        question: 1,
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

    getSectionOneData(url, scope);
  },

  handleNext: function(answer){

    console.log('old answer to question'+this.state.question, this.state.responses.section1["question" + this.state.question].answer)

    // Log the user's response
    this.state.responses.section1["question" + this.state.question].answer = answer;

    console.log('new answer to question'+this.state.question, this.state.responses.section1["question" + this.state.question].answer)
    console.log('new client state', this.state.responses)

    // // NOT on the last question...
    if (this.state.question < (this.state.sectionOneData.length - 1) ){
      console.log('you did not answer the last question yet')
      // First, tell us if user has already answered the question
      var index = this.state.question + 1
      if (this.state.responses.section1["question" + index].answer != null){
          this.setState({
            hasBeenAnswered: true
          })
        } else {
          this.setState({
            hasBeenAnswered: false
          })
        }

        // Then, increment the question index
        this.setState({
          question: this.state.question + 1
        })

        // ON the last question....
      } else {
        console.log('you just answered the last question')
        var index = this.state.question
        if (this.state.responses.section1["question" + index].answer != null){
            this.setState({
              hasBeenAnswered: true
            })
          } else {
            this.setState({
              hasBeenAnswered: false
            })
          }
      };

      // Format response data for sending into server
      var responseData = {}
      for (var i = 1; i < 4; i++){
          responseData['question' + i] = this.state.responses.section1['question' + i].answer
      }

      console.log('sending this to reducer: ' , responseData);

      var scope = this;
      var url = "/api/background";

      convertToScore(url, scope, responseData);
    },

  handleBack: function(){
    if (this.state.question > 1){
      this.setState({
        question: this.state.question - 1
      })

      var index = this.state.question - 1

      if (this.state.responses["question" + index].answer != null){
        this.setState({
          hasBeenAnswered: true
        })
      } else {
        this.setState({
          hasBeenAnswered: false
        })
      }
    }

  },

  render: function(){

    function onChange(e) {
      console.log( e.target )
      console.log('checkbox checked:', (e.target.checked));
    }

    var questionIndex = this.state.question;
    var that = this;

    var questionToShow = () => {

      if(that.state.gotData){
        switch (questionIndex) {
          case 1:
            return (
              <div>
                <h3>Q1 - Degree Selector ... adds points</h3>
                <Selector questionIndex={questionIndex}
                  handleNext={this.handleNext}
                  gotData={this.state.gotData}
                  data={this.state.sectionOneData}
                  titleCase={true}
                  sortAlphabetically={true}
                />
              </div>
            );
            break;

          case 2:
            return (
              <div>
                <h3>Q2 - Education Selector ... adds modules</h3>
                <Selector questionIndex={questionIndex}
                  handleNext={this.handleNext}
                  gotData={this.state.gotData}
                  data={this.state.sectionOneData}
                  titleCase={false}
                  sortAlphabetically={false}
                />
              </div>
            );
            break;

          case 3:
            return <ExtraDegreesChecklist handleNext={this.handleNext} data={this.state.sectionOneData}/>;
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
        {questionToShow()}
        <ScoreDisplay score={this.state.score}/>
        <button onClick={() => getSectionTwoData("https://deloitteeyf.staging.wpengine.com/wp-json/wp/v2/passionq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC", this)}>Testing</button>
        <button onClick={() => getSectionThreeData("https://deloitteeyf.staging.wpengine.com/wp-json/wp/v2/projectq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC", this)}>Testing</button>
      </div>
    )
  }
});


ReactDOM.render(<Survey/>, document.getElementById('survey'));


if (module.hot) {
  module.hot.accept();
}
