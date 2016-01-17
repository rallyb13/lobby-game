import React from 'react';
import Score from './Score';
import MoveCounter from './MoveCounter';
import Bank from './Bank';
import NextGoal from './NextGoal';

var Scoreboard = React.createClass({
  render: function(){
    return (
      <div style={this.styles.scoreboard}>
        <h3 style={this.styles.heading}>White Paper</h3>
        <Score score={this.props.state.score} />
        <Bank bankBalance={this.props.state.bankBalance} />
        <MoveCounter movesRemaining={this.props.state.movesRemaining} />
        <NextGoal nextGoal={this.props.state.nextGoal} />
      </div>
    );
  },

  styles: {
     scoreboard: {
      border: '1px solid #000',
      background: 'url(images/crumpled_looseleaf.jpg)',
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundColor: '#DFDFDB',
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
