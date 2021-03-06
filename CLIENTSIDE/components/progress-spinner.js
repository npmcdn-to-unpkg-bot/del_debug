var React = require('react');
var ReactDOM = require('react-dom');

require('../../node_modules/gsap/src/minified/TweenMax.min');
require('../public/plugins/DrawSVGPlugin.min');

// ***** PROPS *****
// totalQuestions = NUMBER
// questionIndex = NUMBER ... how far along we are

var Progress = React.createClass({
  render: function() {
    var totalQuestions = this.props.totalQuestions;
    var questionIndex = this.props.questionIndex;
    var percent = this.props.totalQuestions ? (questionIndex/totalQuestions) * 100 : 0;
    var percentString = Math.round(percent) + '%';

    TweenMax.set('#progressPath', {drawSVG:0});
    TweenMax.fromTo('#progressPath', .25, {drawSVG:"0"}, {drawSVG:'0 ' + percent + '%', ease:Power2.easeIn});

    var spinnerText = function(){
      if (percent > 10){
        return  <text x="41" y="54" fill="#A1EB87" style={{fontSize: '10px'}}>{percentString}</text>
      } else {
        return  <text x="44" y="54" fill="#A1EB87" style={{fontSize: '10px'}}>{percentString}</text>
      }
    }

    return(
      <svg height="100" width="100" >
        <circle className="st0" cx="50" cy="50" r="25"/>
        <circle strokeWidth="20" stroke="#A1EB87" className="st1" id="progressPath" cx="50" cy="50" r="15"/>
        <circle cx="50" cy="50" r="15"/>
        {spinnerText()}
      </svg>
    )
  }
});


module.exports = Progress;
