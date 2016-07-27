import React from 'react';
import Staging from './Staging';
import MemoButton from './MemoButton';
import Score from './Score';
import Bank from './Bank';
import Office from './Office';
import MoveCounter from './MoveCounter';
import NextGoal from './NextGoal';

var Scoreboard = React.createClass({
  render: function(){
    var negativeBal = this.props.state.bankBalance < this.props.state.nextGoal,
      moveCount = this.props.state.movesRemaining,
      textColor = (negativeBal && moveCount <= 20 && moveCount > 0) ? 'red' : 'black';

    return (
      <div style={this.styles.scoreboard}>
        <h3 style={this.styles.heading}>White Paper</h3>
        <div style={this.styles.bodyBoard}>
          <Staging stagedToken={this.props.state.stagedToken} />
          <MemoButton/>
          <Score score={this.props.state.score} />
          <Bank bankBalance={this.props.state.bankBalance} textColor={textColor} />
          <Office electedOffice={this.props.state.electedOffice} />
          <MoveCounter movesRemaining={this.props.state.movesRemaining} phase={this.props.state.phase} textColor={textColor} />
          <NextGoal nextGoal={this.props.state.nextGoal} textColor={textColor} />
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
