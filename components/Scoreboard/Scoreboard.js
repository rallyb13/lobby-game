import React from 'react';
import Staging from './Staging';
import MemoButton from './MemoButton';
import Score from './Score';
import Bank from './Bank';
import Office from './Office';
import MoveCounter from './MoveCounter';
import NextGoal from './NextGoal';
import QuidStore from '../../store'

var Scoreboard = React.createClass({
  render: function(){
    var negativeBal = this.props.status.bankBalance < this.props.status.nextGoal,
      moveCount = this.props.status.movesRemaining,
      username = this.props.userInfo.userName,
      displayName = username === '' ? 'Login' : username,
      textColor = (negativeBal && moveCount <= 20 && moveCount > 0) ? 'red' : 'black';

    return (
      <div className='scoreboard'>
        <h3 className='paper-heading'>White Paper</h3>
        <div className='paper-body'>
          <h4 onClick={this.handleLogin}>{displayName}</h4>
          <Staging stagedToken={this.props.stagedToken} />
          <MemoButton/>
          <Score score={this.props.status.score} />
          <Bank bankBalance={this.props.status.bankBalance} textColor={textColor} />
          <Office electedOffice={this.props.status.electedOffice} />
          <MoveCounter movesRemaining={this.props.status.movesRemaining} phase={this.props.status.phase} textColor={textColor} />
          <NextGoal nextGoal={this.props.status.nextGoal} textColor={textColor} />
        </div>
      </div>
    );
  },

  handleLogin() {
    QuidStore.handleLogin(true);
  }
});

export default Scoreboard
