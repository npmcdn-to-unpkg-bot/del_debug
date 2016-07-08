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

       // Set up our client-side "store" for this section's user responses
       var tempData = {};
       for (var i = 1; i < res.length; i++){
         tempData["question" + (i)] = {answer: null}
       }

       console.log('This is the client state: ', tempData)

       scope.setState({
         gotData: true,
         data: res,
         responses: tempData
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

var EducationSelector = React.createClass({

  getInitialState: function(){
    return({
      fieldValue: ''
    })
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

    if (this.props.gotData){
      this.props.data[2].acf.background_categories.forEach(
        function(element, index, array){
          options.push({value: element.category_name, label: element.category_name})
        }
      )
    }

    return(
      <div>
      <h3>Q2 - Education Selector ... adds modules</h3>
      <Select
        name="education-selector"
        value={this.state.fieldValue}
        options={options}
        onChange={logChange}
      />
      </div>
    )
  }

});

var DegreeSelector = React.createClass({

  getInitialState: function(){
    return({
      fieldValue: ''
    })
  },

  render: function(){

    function toTitleCase(str){
          return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }

    var that = this;
    function logChange(answer) {
        that.setState({
          fieldValue: answer.value
        });
        that.props.handleNext(answer.value)
    };

    var options = [];

    if (this.props.gotData){
      this.props.data[1].acf.background_categories.forEach(
        function(element, index, array){
          options.push({value: toTitleCase(element.category_name), label: toTitleCase(element.category_name)})
        }
      )
    }

    // SORT THESE ALPHABETICALLY
    options.sort(function(a, b) {
      var textA = a.value.toUpperCase();
      var textB = b.value.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });


    return(
      <div>
        <h3>Q1 - Degree Selector ... adds points</h3>
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
    var url = "https://deloitteeyf.staging.wpengine.com/wp-json/wp/v2/backgroundq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC";

    getInitialData(url, scope);
  },

  handleNext: function(answer){

    console.log('old answer to question'+this.state.question, this.state.responses["question" + this.state.question].answer)

    // Log the user's response
    this.state.responses["question" + this.state.question].answer = answer;

    console.log('new answer to question'+this.state.question, this.state.responses["question" + this.state.question].answer)
    console.log('new client state', this.state.responses)

    // // NOT on the last question...
    if (this.state.question < (this.state.data.length - 1) ){
      console.log('you did not answer the last question yet')
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
        console.log('you just answered the last question')
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
      for (var i = 1; i < 4; i++){
          responseData['question' + i] = this.state.responses['question' + i].answer
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

    var DegreeSelectorCond = this.state.gotData ? <DegreeSelector questionIndex={questionIndex} totalQuestions={this.state.data.length - 1} hasBeenAnswered={this.state.hasBeenAnswered} score={this.state.score} handleNext={this.handleNext} handleBack={this.handleBack} gotData={this.state.gotData} data={this.state.data}/> : <div>nodata</div>;
    var EducationSelectorCond = this.state.gotData ? <EducationSelector handleNext={this.handleNext} gotData={this.state.gotData} data={this.state.data}/> : <div>nodata</div>;

    var questionToShow = () => {
      switch (questionIndex) {
        case 1:
          return DegreeSelectorCond;
          break;

        case 2:
          return EducationSelectorCond;
          break;

        case 3:
          return <ExtraDegreesChecklist handleNext={this.handleNext} data={this.state.data}/>;
          break;

      }
    }

    return(
      <div>
        <p className='backBtn' onClick={this.handleBack}><i className='fa fa-arrow-circle-left'></i> back</p>
        {questionToShow()}
        <ScoreDisplay score={this.state.score}/>
      </div>
    )
  }
});


ReactDOM.render(<Survey/>, document.getElementById('survey'));


if (module.hot) {
  module.hot.accept();
}
