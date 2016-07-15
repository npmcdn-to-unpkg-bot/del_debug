var React = require('react');
var ReactDOM = require('react-dom');

var Checkbox = require('rc-checkbox');



// ***** PROPS *****
// handleNext = fn() .... callback for next button, sends currently selected answers in an array
// data = [array] .... of options for the checklist to render
// clientAnswer = [array] .... of options to display as pre-selected

var Checklist = React.createClass({

  getInitialState: function() {
    return {
      selectedAnswers: []
    };
  },

  componentDidMount: function() {

    var that = this;
    if (that.props.clientAnswer != null){
      that.setState({
        selectedAnswers: that.props.clientAnswer
      })
    }
  },

  checkHandler: function(e){
      var that = this;
      if (e.target.checked) {
        that.setState({
          selectedAnswers: that.state.selectedAnswers.concat(e.target.name)
        })
      } else {
        that.setState({
          selectedAnswers: that.state.selectedAnswers.remove(e.target.name)
        })
      }
  },

  render: function(){
    var that =this;
    var checkBoxes = this.props.data.map(function(element){
      function getChecked(){
          if(that.state.selectedAnswers.indexOf(element) != -1){
            return (
              <input type="checkbox"
                name={element}
                checked
                onClick={that.checkHandler}
                value={element} />
            )
          } else {
            return (
              <input type="checkbox"
                name={element}
                onClick={that.checkHandler}
                value={element} />
            )
          }
        }

      return(
          <li>
            <label>
             {element} &nbsp;
             {getChecked()}
           </label>
         </li>
        )
      })

    return (
      <div>
        <h3>Q3 - Extras Selector ... adds points AND modules</h3>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <ul>
            {checkBoxes}
            </ul>
          </div>
          <div className="col-md-3"></div>
        </div>
        <button onClick={() => this.props.handleNext(this.state.selectedAnswers)}>NEXT</button>
      </div>
    )
  }
});


module.exports = Checklist;
