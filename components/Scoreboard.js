import React from 'react';
import Message from './Message';
import Score from './Score';
import Bank from './Bank';
import Office from './Office';
import MoveCounter from './MoveCounter';
import NextGoal from './NextGoal';

var Scoreboard = React.createClass({
  render: function(){
    return (
      <div style={this.styles.scoreboard}>
        <h3 style={this.styles.heading}>White Paper</h3>
        <div style={this.styles.bodyBoard}>
          <Message alert={this.props.state.newMessage} message={this.props.state.message} />
          <Score score={this.props.state.score} />
          <Bank bankBalance={this.props.state.bankBalance} />
          <Office electedOffice={this.props.state.electedOffice} />
          <MoveCounter movesRemaining={this.props.state.movesRemaining} />
          <NextGoal nextGoal={this.props.state.nextGoal} />
        </div>
      </div>
    );
  },

  styles: {
     scoreboard: {
      border: '1px solid #000',
      background: 'url(assets/crumpled_looseleaf.jpg)',
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
    },
    bodyBoard: {
      padding: '0 10px',
    }
  }

});

export default Scoreboard
