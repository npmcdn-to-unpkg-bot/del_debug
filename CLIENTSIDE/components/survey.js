var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require( 'classnames' );


var ScoreDisplay = React.createClass({
  render: function(){

    return(
      <div className='row'>
        <div className='col-md-6'>
          <h2>CORE AREAS</h2>
          <div><h4 style={{display: 'inline-block'}}>AUDIT</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.audit}</p></div>
          <div><h4 style={{display: 'inline-block'}}>ADVISORY</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.advisory}</p></div>
          <div><h4 style={{display: 'inline-block'}}>CONSULTING</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.consulting}</p></div>
          <div><h4 style={{display: 'inline-block'}}>TAX</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.tax}</p></div>
        </div>
        <div className='col-md-6'>
          <h2>FOCUS AREAS</h2>
          <div><h4 style={{display: 'inline-block'}}>TECH</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.tech}</p></div>
          <div><h4 style={{display: 'inline-block'}}>NON-TECH</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.nontech}</p></div>
          <div><h4 style={{display: 'inline-block'}}>FEDERAL</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.federal}</p></div>
          <div><h4 style={{display: 'inline-block'}}>PUBLIC</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.public}</p></div>
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
    if (this.props.questionIndex < this.props.totalQuestions) {
      this.props.handleNext(answer)
    } else {
      console.log('submitting last question')

      this.props.handleNext(answer)
    }
  },

  render: function(){

    $('#choiceA').removeClass('selectedAnswer')
    $('#choiceB').removeClass('selectedAnswer')

    var choiceA= this.props.choiceA
    var formattedChoiceA = choiceA.replace(/(<([^>]+)>)/ig,"").toUpperCase()

    var choiceB= this.props.choiceB
    var formattedChoiceB = choiceB.replace(/(<([^>]+)>)/ig,"").toUpperCase()


    var temp = this.props.answer ? <p>"A"</p> : <p>"B"</p>
    var test = this.props.hasBeenAnswered ? <h4>YOU ANSWERED <strong style={{display: 'inline-block'}}>{temp}</strong></h4> : <p>not answered</p>

    if (this.props.answer != null) {
      if (this.props.answer) {
        $('#choiceA').addClass('selectedAnswer')
      } else {
        $('#choiceB').addClass('selectedAnswer')
      }
    }


    return(
      <div>
        <div className="selectorHolder">
          <h3 className='passionTitle'>Which would you prefer or find most rewarding?</h3>
          <p className='backBtn' onClick={this.props.handleBack}><i className='fa fa-arrow-circle-left'></i> back</p>
          <div id='choiceA' className='optionBox'  onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} onClick={() => this.checkEnd(true)}>
            <p className='temp2'>{formattedChoiceA}</p>
          </div>
          <div id='choiceB' className='optionBox right' onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} onClick={() => this.checkEnd(false)}>
            <p className='temp2'>{formattedChoiceB}</p>
          </div>
          <div id='divider' className='temp'><p>or</p></div>
          {test}
          <ScoreDisplay score={this.props.score}/>
        </div>
      </div>
    )
  }
});

var Survey = React.createClass({

  getInitialState: function(){
    return({
      gotData: false,
      data: [],
      question: 1,
      responses: {},
      hasBeenAnswered: false,
      score: {}
    })
  },

  componentDidMount: function(){

    var that = this;

    $.ajax({
       url: "https://deloitteeyf.wpengine.com/wp-json/wp/v2/passionq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC",
       type: 'GET',
       dataType: 'json',
       success: function(res) {
         var tempData = {};

         for (var i = 1; i < res.length; i++){
           tempData["question" + (i)] = {answer: null}
         }

         that.setState({
           gotData: true,
           data: res,
           responses: tempData
         })
       }
    });
  },

  handleNext: function(answer){

      this.state.responses["question" + this.state.question].answer = answer;

    if (this.state.question < (this.state.data.length - 1 ) ){

      this.setState({
        question: this.state.question + 1
      })


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
        }

        var submitData = {}
        for (var i = 1; i < 9; i++){
            submitData['question' + i] = this.state.responses['question' + i].answer
        }

        var that = this;
        $.ajax({
           url: "/api/survey",
           type: 'POST',
           data: submitData,
           success: function(res) {
             console.log('success! Got results!')
             that.setState({
               score: res
             })
           },
           error: function(xhr, status, err){
                   console.log('Can\'t do that, Tiger!')
                   console.error(status, err.toString)
               }.bind(this)
        });
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

  handleReport: function(){
    console.log(this.state.responses)
  },

  render: function(){

    var questionIndex = this.state.question;
    var SurveyOptionsCond = this.state.gotData ? <SurveyOptions choiceA={this.state.data[questionIndex].acf.passion_choice_a} choiceB={this.state.data[questionIndex].acf.passion_choice_b} questionIndex={questionIndex} totalQuestions={this.state.data.length - 1} hasBeenAnswered={this.state.hasBeenAnswered} answer={this.state.responses["question" + questionIndex].answer} score={this.state.score} handleNext={this.handleNext} handleBack={this.handleBack} handleReport={this.handleReport}/> : <div>nodata</div>;
    return(
      <div>
        {SurveyOptionsCond}
      </div>
    )
  }
});


ReactDOM.render(<Survey/>, document.getElementById('survey'));


if (module.hot) {
  module.hot.accept();
}
