var React = require('react');
var ReactDOM = require('react-dom');


var SurveyOptions = React.createClass({

  handleHoverOver: function(e){
    TweenMax.to($(e.target).closest('.optionBox'), .5, {backgroundColor: 'rgba(255,255,255,.6)', color: '#000'});
  },

  handleHoverOut: function(e){
    TweenMax.to($(e.target).closest('.optionBox'), .5, {backgroundColor: 'rgba(32,32,32,.45)', color: '#A1EB87'});
  },

  render: function(){

    var choiceA= this.props.choiceA
    var formattedChoiceA = choiceA.replace(/(<([^>]+)>)/ig,"").toUpperCase()

    var choiceB= this.props.choiceB
    var formattedChoiceB = choiceB.replace(/(<([^>]+)>)/ig,"").toUpperCase()

    return(
      <div className="selectorHolder">
        <p className='backBtn' onClick={this.props.handleBack}><i className='fa fa-arrow-circle-left'></i> back</p>
        <div id='choiceA' className='optionBox'  onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} onClick={this.props.handleNext}>
          <p className='temp2'>{formattedChoiceA}</p>
        </div>
        <div id='choiceB' className='optionBox right' onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} onClick={this.props.handleNext}>
          <p className='temp2'>{formattedChoiceB}</p>
        </div>
        <div id='divider' className='temp'><p>or</p></div>
      </div>
    )
  }
});

var Survey = React.createClass({

  getInitialState: function(){
    return({
      gotData: false,
      data: [],
      question: 1
    })
  },

  componentDidMount: function(){

    var that = this;

    $.ajax({
       url: "http://deloitteeyf.wpengine.com/wp-json/wp/v2/passionq?_embed&filter[posts_per_page]=999&filter[orderby]=menu_order&filter[order]=ASC",
       type: 'GET',
       dataType: 'json',
       success: function(res) {
         that.setState({
           gotData: true,
           data: res
         })
       }
    });
  },

  handleNext: function(){
    if (this.state.question < (this.state.data.length - 1) ){
      this.setState({
        question: this.state.question + 1
      })
    }
  },

  handleBack: function(){
    if (this.state.question > 1){
      this.setState({
        question: this.state.question - 1
      })
    }
  },

  render: function(){

    var questionIndex = this.state.question;
    var SurveyOptionsCond = this.state.gotData ? <SurveyOptions choiceA={this.state.data[questionIndex].acf.passion_choice_a} choiceB={this.state.data[questionIndex].acf.passion_choice_b} handleNext={this.handleNext} handleBack={this.handleBack}/> : <div>nodata</div>

    return(
      <div>
        <div/>
        {SurveyOptionsCond}
      </div>
    )
  }
});


ReactDOM.render(<Survey/>, document.getElementById('survey'));


if (module.hot) {
  module.hot.accept();
}
