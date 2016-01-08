import React from 'react';
import Score from './Score';

var Scoreboard = React.createClass({
  render: function(){

    return (
      <div style={this.styles.scoreboard} />
        <h3 style={this.styles.heading}>Scoreboard</h3>
        <Score />
      </div>
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
    },
    heading: {
      borderBottom: '1px solid black'
    }
  }

});

export default Scoreboard
