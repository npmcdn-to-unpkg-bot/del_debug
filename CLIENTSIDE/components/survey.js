var React = require('react');
var ReactDOM = require('react-dom');

var data = {
  choiceA: 'DRAW CONCLUSIONS FROM DATA',
  choiceB: 'DRAW CONCLUSIONS FROM CONVERSATIONS'
}


var SurveyOptions = React.createClass({

  handleHoverOver: function(e){
    TweenMax.to($(e.target).closest('.optionBox'), .5, {backgroundColor: 'rgba(255,255,255,.6)', color: '#000'});
  },

  handleHoverOut: function(e){
    TweenMax.to($(e.target).closest('.optionBox'), .5, {backgroundColor: 'rgba(32,32,32,.45)', color: '#A1EB87'});
  },

  render: function(){

    var styles = {
      width: '300px',
      height: '300px',
      borderRadius: '100%',
      border: '#A1EB87 5px solid',
      display: 'inline-block',
      backgroundColor: 'rgba(32,32,32,.4)',
      position: 'absolute',
      color: '#A1EB87',
      cursor: 'pointer'
    }

    var styles2 = {
      width: '300px',
      height: '300px',
      borderRadius: '100%',
      border: '#A1EB87 5px solid',
      display: 'inline-block',
      backgroundColor: 'rgba(32,32,32,.4)',
      color: '#A1EB87',
      cursor: 'pointer'
    }

    var dividerStyle = {
      textAlign: 'center',
      top: '50%',
      transform: 'translateY(-50%)',
      position: 'relative',
      fontStyle: 'italic',
      fontSize: '20px',
      left: '-2.5%'
    }

    return(
      <div className="selectorHolder">
        <div id='choiceA' className='optionBox'  onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} style={styles2}>
          <p className='temp2'>{this.props.choiceA}</p>
        </div>
        <div id='choiceB' className='optionBox' onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} style={styles}>
          <p className='temp2'>{this.props.choiceB}</p>
        </div>
        <div id='divider' className='temp'><p style={dividerStyle}>or</p></div>
      </div>
    )
  }
});

var Survey = React.createClass({

  render: function(){
    return(
      <SurveyOptions choiceA={data.choiceA} choiceB={data.choiceB}/>
    )
  }
});


ReactDOM.render(<Survey/>, document.getElementById('survey'));


if (module.hot) {
  module.hot.accept();
}
