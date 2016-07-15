var React = require('react');
var ReactDOM = require('react-dom');

// ****** PROPS ******
// answer = BOOLEAN / null ... indicates whether A, B or neither should be highlighted (e.g. user already answered the question)
// handleNext = fn(answer, index) .... callback fires after selecting A or B
// choiceA = 'String' ... Text to insert into the A block
// choiceB = 'String' ... Text to insert into the B block

var AnswerSelector = React.createClass({


   handleHoverOver: function(e){
     TweenMax.to($(e.target).closest('.optionBox'), .5, {backgroundColor: 'rgba(255,255,255,.6)', color: '#000'});
   },

   handleHoverOut: function(e){
     TweenMax.to($(e.target).closest('.optionBox'), .5, {backgroundColor: 'rgba(32,32,32,.45)', color: '#A1EB87'});
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

     return(
       <div>
         <div className="selectorHolder">
           <h3 className='passionTitle'>Which would you prefer or find most rewarding?</h3>
           <div id='choiceA' className='optionBox'  onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} onClick={() => this.props.handleNext(true, this.props.questionIndex)}>
             <p className='temp2'>{formatQuestion(this.props.choiceA)}</p>
           </div>
           <div id='choiceB' className='optionBox right' onMouseOver={this.handleHoverOver} onMouseOut={this.handleHoverOut} onClick={() => this.props.handleNext(false, this.props.questionIndex)}>
             <p className='temp2'>{formatQuestion(this.props.choiceB)}</p>
           </div>
           <div id='divider' className='temp'><p>or</p></div>
         </div>
       </div>
     )
   }
 });

module.exports = AnswerSelector;
