var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('react-select');


// PROPS:
//   titleCase: BOOLEAN
//   sortAlphabetically: BOOLEAN
//   data
//   questionIndex
//   clientAnswer: null OR string
var Selector = React.createClass({

  getInitialState: function(){
    return({
      fieldValue: ''
    })
  },

  toTitleCase: function(inputStr){
    return inputStr.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },

  sortAlphabetically: function(inputArray){
    inputArray.sort(function(a, b) {
      var textA = a.value.toUpperCase();
      var textB = b.value.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  },

  logChange: function(answer) {
      this.setState({
        fieldValue: answer.value
      });
      this.props.handleNext(answer.value)
  },

  render: function(){

    var options = [];
    var questionIndex = this.props.questionIndex;
    var that = this;

    if (this.props.gotData){
      this.props.data[questionIndex].acf.background_categories.forEach(
        function(element, index, array){

          // Check if we want to display with Title Casing
          var elementName = element.category_name;
          if (that.props.titleCase){
            elementName = that.toTitleCase(elementName)
          }

          options.push({value: elementName, label: elementName})
        }
      )
    };

    // Check if we want to display sorted alphabetically
    if (this.props.sortAlphabetically){
      that.sortAlphabetically(options)
    };

    return(
      <Select
        name="education-selector"
        value={this.props.clientAnswer}
        options={options}
        onChange={this.logChange}
      />
    )
  }

});


module.exports = Selector;
