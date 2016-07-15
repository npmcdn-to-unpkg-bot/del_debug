var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require( 'classnames' );

require('../../node_modules/gsap/src/minified/TweenMax.min');
require('../../node_modules/gsap/src/uncompressed/utils/Draggable');


var ScoreDisplay = React.createClass({

  getInitialState: function() {
    return {
      showing: true
    };
  },

  componentDidMount: function() {
    Draggable.create("#scoreboard", {type:"x,y", edgeResistance:0.65, throwProps:true});
  },

  toggleShowing: function(){

    this.setState({
      showing: !this.state.showing
    })
  },

  render: function(){


    // SET UP DEBUGGING INDICATOR FOR MODULES
    var modules;
    if (this.props.score.modules && this.props.score.modules[0]){
      modules = this.props.score.modules.map(function(element){return(<li>{element}</li>)})
    } else {
      modules = <p>no modules </p>
    }

    var classes = classNames({ row: true, invisible: !this.state.showing});

    var showBtnClasses = classNames({invisible: this.state.showing});

    return(
      <div style={{paddingTop: '50px'}}>
        <button onClick={this.toggleShowing} className={showBtnClasses}>Show Current Score</button>
        <div className={classes}>
          <div id='scoreboard' className='container' style={{backgroundColor: 'rgba(133,188,34,.95)', height: 'auto', padding: '25px', color: '#fff', boxShadow: '5px 5px 10px rgba(32,32,32,.25)', textShadow: '3px 3px 5px rgba(32,32,32,.15)'}}>
            <p className='closeBtn' onClick={this.toggleShowing} style={{textAlign: 'right', cursor: 'pointer'}}>close <i className='fa fa-times'></i></p>
            <div className='row'>
              <h2 style={{width: '100%', textAlign: 'center'}}>EXPLORE YOUR FIT SCOREBOARD</h2>
            </div>
            <div className='container' style={{marginTop: '20px'}}>
              <h3>CORE AREAS</h3>
              <div className='container'><hr style={{width: '75%', float: 'left'}}></hr></div>
              <div className='container'>
                <h4 style={{display: 'inline-block'}}>AUDIT</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.audit}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <h4 style={{display: 'inline-block'}}>ADVISORY</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.advisory}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <h4 style={{display: 'inline-block'}}>CONSULTING</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.consulting}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <h4 style={{display: 'inline-block'}}>TAX</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.tax}</p>
              </div>
            </div>
            <div className='container' style={{marginTop: '20px'}}>
              <h3>FOCUS AREAS</h3>
              <div className='container'><hr style={{width: '75%', float: 'left'}}></hr></div>
              <div className='container'>
                <h4 style={{display: 'inline-block'}}>TECH</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.tech}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <h4 style={{display: 'inline-block'}}>NON-TECH</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.nontech}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <h4 style={{display: 'inline-block'}}>FEDERAL</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.federal}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <h4 style={{display: 'inline-block'}}>PUBLIC</h4><p style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score.public}&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
            </div>
            <div className='container' style={{marginTop: '20px'}}>
              <h3>MODULES</h3>
              <ul>
                {modules}
              </ul>
          </div>
        </div>
        </div>
      </div>
    )
  }
});

module.exports = ScoreDisplay;
