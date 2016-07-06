var React = require('react');
var ReactDOM = require('react-dom');


var Test = React.createClass({

  render: function(){
    return(
      <div className="jumbotron">
        <p>Hello MR SHARKICORN</p>
        <img src="http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD"/>
      </div>
    )
  }
});

ReactDOM.render(<Test/>, document.getElementById('test'));


if (module.hot) {
  module.hot.accept();
}
