import React from 'react';
import Score from './Score';
import MoveCounter from './MoveCounter';
import Bank from './Bank';

var Scoreboard = React.createClass({
  render: function(){

    return (
      <div style={this.styles.scoreboard}>
        <h3 style={this.styles.heading}>White Paper</h3>
        <Score />
        <Bank money={'355'} />
        <MoveCounter />
      </div>
    );
  },

  styles: {
     scoreboard: {
      border: '1px solid #000',
      background: 'url(../images/crumpled_looseleaf.jpg)',
      backgroundPosition: 'center',
      backgroundSize: '100%',
      height: '50%',
      display: 'block',
      position: 'relative'
    },
    heading: {
      borderBottom: '1px solid black',
      textAlign: 'center'
    }
  }

});

export default Scoreboard
