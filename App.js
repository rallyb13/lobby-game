import React from 'react';
import QuidStore from './store';
import Utils from './utils';
import Bench from './components/Bench';
import Grid from './components/Grid';
import NextSelect from './components/NextSelect';
import Scoreboard from './components/Scoreboard';
import Staging from './components/Staging';

var App = React.createClass ({
  componentWillMount: function () {
    QuidStore.setupBoard();
    this.setState(QuidStore.getCurrentState());
  },

  componentDidMount: function(){
    QuidStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function(){
    QuidStore.removeChangeListener(this.onChange);
  },

  render(){
    var isGameOver = this.isGameOver(),
      nextBit,
      advMsg;

    if(this.state.movesRemaining === 0){
      advMsg = this.handleElection();
    }

    if (isGameOver || advMsg !== 'none' ){
      nextBit = <NextSelect gameOver={isGameOver} advMsg={advMsg} electionPhase={this.state.phase}/>;
    } else {
      nextBit = <Staging stagedToken={this.state.stagedToken} gameOver={isGameOver} />;
    }
    return (
      <div>
        <div style={{maxWidth:'900px', margin: '0 auto'}}>
          <h1 style={this.styles.gameTitle}>Quid: The Game of Outrageous Political Shenanigans</h1>
          <Bench helpers={this.state.helpers} poweringUp={this.state.helperChange}/>
          <div style={this.styles.panel}>
            <div>{nextBit}</div>
            <Scoreboard state={this.state} gameOver={isGameOver}/>
          </div>
          <Grid board={this.state.board} stagedToken={this.state.stagedToken} megaPossCoords={this.state.megaPossCoords} toPowerUp={this.state.createPowerUp} gameOver={isGameOver}/>
        </div>
      </div>
    );
  },

  onChange: function() {
    this.setState(QuidStore.getCurrentState());
  },

  isGameOver: function(){
    if (QuidStore.findTokenCoords('').length > 0){
      if (this.state.bankBalance >= 0){
        return false;
      } else {
        return 'bank';
      }
    } else {
      return 'board';
    }
  },

  handleElection: function(){
    var advMsg = Utils.setElectionChoice(currentState.phase);
    QuidStore.deposit(-this.state.nextGoal);
    if (advMsg === 'none'){
      QuidStore.changePhase(1);
    }
    return advMsg;
  },

  styles: {
    gameTitle: {
        color: 'white',
        padding: '10px, 25px'
    },
    panel: {
      width: '30%',
      float: 'right'
    },
  }
});
export default App
