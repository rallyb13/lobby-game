import React from 'react';
import Staging from './Staging';
import Message from './Message';
import Score from './Score';
import Bank from './Bank';
import Office from './Office';
import MoveCounter from './MoveCounter';
import NextGoal from './NextGoal';
import NextSelect from './NextSelect';

var Scoreboard = React.createClass({
  render: function(){
    var negativeBal = this.props.state.bankBalance < this.props.state.nextGoal,
      textColor = (negativeBal && this.props.state.movesRemaining <= 20) ? 'red' : 'black',
      advMsg = this.props.state.advMsg,
      isGameOver = this.props.gameOver, //isGameOver is only one set in App, not part of state object
      nextBit;

    if (isGameOver || advMsg !== 'none' ){
      nextBit = <NextSelect gameOver={isGameOver} advMsg={advMsg} phase={this.props.state.phase} repeat={this.props.state.repeat} />;
    } else {
      nextBit = <Staging stagedToken={this.props.state.stagedToken} gameOver={isGameOver} />;
    }

    return (
      <div style={this.styles.scoreboard}>
        <h3 style={this.styles.heading}>White Paper</h3>
        <div style={this.styles.bodyBoard}>
          {nextBit}
          <Message alert={this.props.state.newMessage} message={this.props.state.message} phase={this.props.state.phase} gameOver={isGameOver} />
          <Score score={this.props.state.score} />
          <Bank bankBalance={this.props.state.bankBalance} textColor={textColor} />
          <Office electedOffice={this.props.state.electedOffice} />
          <MoveCounter movesRemaining={this.props.state.movesRemaining} phase={this.props.state.phase} textColor={textColor} />
          <NextGoal nextGoal={this.props.state.nextGoal} textColor={textColor} />
        </div>
      </div>
    );
  },

  //checks that board is not full and bank balance is still positive (at end of election cycle)
  isGameOver: function(advMsg){
    if (advMsg === 'bank'){
      return advMsg;
    } else if (QuidStore.findTokenCoords('').length === 0){
      return 'board';
    } else {
      return false;
    }
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
