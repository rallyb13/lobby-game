import React from 'react';

var Scoreboard = React.createClass({
  render: function(){

    return (
      <div style={this.styles.scoreboard} >Scoreboard</div>
    );
  },

  styles: {
     scoreboard: {
      border: '1px solid #000',
      background: 'red',
      height: '100%',
      width: '30%',
      display: 'inline',
      float: 'right'
     }
  }

});

export default Scoreboard
