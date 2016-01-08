import React from 'react';
import Score from './Score';
import Staging from './Staging';

var Scoreboard = React.createClass({
  render: function(){

    return (
      <div style={this.styles.scoreboard}>
        <h3 style={this.styles.heading}>Scoreboard</h3>
        <Score />
        <div style={this.styles.symbolBlock}><Staging /></div>
      </div>
    );
  },

  styles: {
     scoreboard: {
      border: '1px solid #000',
      background: 'red',
      height: '100%',
      width: '30%',
      display: 'inline-block',
      float: 'right',
      position: 'relative'
    },
    heading: {
      borderBottom: '1px solid black'
    },
     symbolBlock: {
      height: '100px',
      width: '100%',
      color: 'white',
      display: 'block',
      position: 'relative',
     }
  }

});

export default Scoreboard
