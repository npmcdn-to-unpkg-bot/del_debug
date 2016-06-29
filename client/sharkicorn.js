var React = require('react');
var ReactDOM = require('react-dom');

var Sharkicorn = React.createClass({

  getInitialState: function(){
    return({
      data: null
    })
  },

  componentDidMount: function(){
    var that = this;

    $.ajax({
        url: "/api/datamonster",
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
          that.setState({
            data: res.monster
          })
          console.log(res)
        }
    });
  },

  updateMonster: function(newMonster){

    var that = this;
    $.ajax({
        url: "/api/datamonster",
        type: 'POST',
        dataType: 'json',
        data: {newMonster: newMonster}, // added data type
        success: function(res) {
          that.setState({
            data: res.monster
          })
          console.log(res)
        }
    });
  },

  render: function() {
    return (
      <div>
        <h1>Hello MR {this.state.data}</h1>
        <button onClick={this.updateMonster.bind(this, 'VAMPIRE')}>VAMPIRE</button>
        <img src="http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD"/>
      </div>
      );
  }
});

ReactDOM.render(<Sharkicorn/>, document.getElementById('shark'));
