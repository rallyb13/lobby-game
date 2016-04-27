import React from 'react';
import QuidStore from './store';
import Utils from './utils';
import Bench from './components/Bench';
import Grid from './components/Grid';
import NextSelect from './components/NextSelect';
import Scoreboard from './components/Scoreboard';
import Staging from './components/Staging';

var App = React.createClass ({
  //creates current board with randomly selected starting tokens and sets game-starting state object
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
      advMsg = this.state.advMsg,
      nextBit;

    if (isGameOver || advMsg !== 'none' ){
      nextBit = <NextSelect gameOver={isGameOver} advMsg={advMsg} phase={this.state.phase} repeat={repeat} />;
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
          <Grid board={this.state.board} stagedToken={this.state.stagedToken} megaPossCoords={this.state.megaPossCoords} toFavor={this.state.createFavor} gameOver={isGameOver}/>
        </div>
      </div>
    );
  },

  //when state object change is emitted, resets state so that changes can be filtered to appropriate components
  onChange: function() {
    this.setState(QuidStore.getCurrentState());
  },

  //checks that board is not full and bank balance is still positive
  //TODO: change check to only check bank balance at moves === 0
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
