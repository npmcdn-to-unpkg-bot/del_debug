var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require( 'classnames' );
var Select = require('react-select');
var Checkbox = require('rc-checkbox');


function getSharedStates(){
  return({
    gotData: false,
    data: [],
    responses: {}
  })
};

function getInitialData(url, scope){
  $.ajax({
     url: url,
     type: 'GET',
     dataType: 'json',
     success: function(res) {

       console.log(res)
       // Set up our client-side "store" for this section's user responses
       var tempData = {};
       for (var i = 1; i < res.length; i++){
         tempData["question" + (i)] = {answer: null}
       }

       scope.setState({
         gotData: true,
         data: res,
         responses: tempData
       })
     }
   })
};

function convertToScore(url, scope, data){
   $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function(res) {
        console.log(res.message)
        scope.setState({
          score: res
        })
      },
      error: function(xhr, status, err){
              console.log('Can\'t do that, Tiger!')
              console.error(status, err.toString)
          }.bind(this)
       });
 };

var DegreeSelector = React.createClass({

  getInitialState: function(){

    // Set up any states unique to THIS component
    var uniqueStates = {
      question: 1,
      hasBeenAnswered: false,
      score: {},
      fieldValue: ''
    }

    // jQuery merge objects
    var stateObject = $.extend({}, uniqueStates, getSharedStates())
    return(stateObject)
  },

  componentDidMount: function(){
    var scope = this;
    var url = "https://deloitteeyf.wpengine.com/wp-json/wp/v2/backgroundq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC";

    getInitialData(url, scope);
  },

  render: function(){

    var that = this;
    function logChange(answer) {
        that.setState({
          fieldValue: answer.value
        });
        that.props.handleNext(answer.value)
    };

    var options = [];

    if (this.state.gotData){

      this.state.data[1].acf.degree_categories.forEach(
        function(element, index, array){
          options.push({value: element.degree, label: element.degree})
        }
      )
    }

    return(
      <div>
      <Select
        name="form-field-name"
        value={this.state.fieldValue}
        options={options}
        onChange={logChange}
      />
      </div>
    )
  }
  });

var ScoreDisplay = React.createClass({

  render: function(){

    var indicator = this.props.score.message ? this.props.score.message : <p>no response yet</p>

    // SET UP DEBUGGING INDICATOR FOR MODULES
    var modules;
    if (this.props.score.modules && this.props.score.modules[0]){
      modules = this.props.score.modules.map(function(element){return(<li>{element}</li>)})
    } else {
      modules = <p>no modules </p>
    }

    return(
      <div className='row'>
        <div className="col-md-12 text-center"><h4>{indicator}</h4></div>
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

var SurveyOptions = React.createClass({

  handleHoverOver: function(e){
    TweenMax.to($(e.target).closest('.optionBox'), .5, {backgroundColor: 'rgba(255,255,255,.6)', color: '#000'});
  },

  handleHoverOut: function(e){
    TweenMax.to($(e.target).closest('.optionBox'), .5, {backgroundColor: 'rgba(32,32,32,.45)', color: '#A1EB87'});
  },

  checkEnd: function(answer){

    // Just tell us if it's the last question in this section
    if (this.props.questionIndex < this.props.totalQuestions) {
      this.props.handleNext(answer)
    } else {
      console.log('submitting last question')
      this.props.handleNext(answer)
    }
  },

  render: function(){

    // Reset the response indicator
    $('#choiceA').removeClass('selectedAnswer')
    $('#choiceB').removeClass('selectedAnswer')

    // Scrub out the WordPress HTML tags && make uppercase
    function formatQuestion(input){
      return input.replace(/(<([^>]+)>)/ig,"").toUpperCase()
    }

    // Highlight the user's selection
    if (this.props.answer != null) {
      if (this.props.answer) {
        $('#choiceA').addClass('selectedAnswer')
      } else {
        $('#choiceB').addClass('selectedAnswer')
      }
    }

    // Temporary indicator for debugging
    var answer = this.props.answer ? <p>"A"</p> : <p>"B"</p>
    var responseIndicator = this.props.hasBeenAnswered ? <h4>YOU ANSWERED <strong style={{display: 'inline-block'}}>{answer}</strong></h4> : <p>not answered</p>

    return(
      <div>
        <div className="selectorHolder">
          <h3 className='passionTitle'>Which would you prefer or find most rewarding?</h3>
          <p className='backBtn' onClick={this.props.handleBack}><i className='fa fa-arrow-circle-left'></i> back</p>
          <div id='choiceA' className='optionBox'  onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} onClick={() => this.checkEnd(true)}>
            <p className='temp2'>{formatQuestion(this.props.choiceA)}</p>
          </div>
          <div id='choiceB' className='optionBox right' onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} onClick={() => this.checkEnd(false)}>
            <p className='temp2'>{formatQuestion(this.props.choiceB)}</p>
          </div>
          <div id='divider' className='temp'><p>or</p></div>
          {responseIndicator}
          <ScoreDisplay score={this.props.score}/>
        </div>
      </div>
    )
  }
});

var Survey = React.createClass({

  getInitialState: function(){

    // Set up any states unique to THIS component
    var uniqueStates = {
      question: 1,
      hasBeenAnswered: false,
      score: {}
    }

    // jQuery merge objects
    var stateObject = $.extend({}, uniqueStates, getSharedStates())
    return(stateObject)
  },

  componentDidMount: function(){
    var scope = this;
    var url = "https://deloitteeyf.wpengine.com/wp-json/wp/v2/backgroundq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC";

    getInitialData(url, scope);
  },

  handleNext: function(answer){

    // Log the user's response
    this.state.responses["question" + this.state.question].answer = answer;

    console.log(this.state.responses)

    // NOT on the last question...
    if (this.state.question < (this.state.data.length - 1) ){

      // First, tell us if user has already answered the question
      var index = this.state.question + 1
      if (this.state.responses["question" + index].answer != null){
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
        var index = this.state.question
        if (this.state.responses["question" + index].answer != null){
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
      for (var i = 1; i < 2; i++){
          responseData['question' + i] = this.state.responses['question' + i].answer
      }

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
    var DegreeSelectorCond = this.state.gotData ? <DegreeSelector questionIndex={questionIndex} totalQuestions={this.state.data.length - 1} hasBeenAnswered={this.state.hasBeenAnswered} score={this.state.score} handleNext={this.handleNext} handleBack={this.handleBack}/> : <div>nodata</div>;
    return(
      <div>
        {DegreeSelectorCond}
        <ScoreDisplay score={this.state.score}/>
        <label>
          Poop
          <Checkbox
            name="my-checkbox"
            onChange={onChange}
          />
        </label>
      </div>
    )
  }
});


ReactDOM.render(<Survey/>, document.getElementById('survey'));


if (module.hot) {
  module.hot.accept();
}
