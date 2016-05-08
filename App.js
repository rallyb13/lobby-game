import React from 'react';
import QuidStore from './store';
import Utils from './utils';
import Bench from './components/Bench';
import Grid from './components/Grid';
import NextSelect from './components/NextSelect';
import Scoreboard from './components/Scoreboard';
import Holder from './components/Holder';

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
    var advMsg = this.state.advMsg,
        isGameOver = this.isGameOver(advMsg),
        holders = this.state.holdTokens,
        allHolders = [],
        key,
        i;

    if (holders.length > 1){
      for (i = 1; i < holders.length; i++){
        key = 'holder' + i;
        allHolders.push( <Holder token={this.state.holdTokens[i]} position={i} key={key} /> );
      }
    } else {
      allHolders.push ( <div></div> );
    }

    return (
      <div>
        <div style={{maxWidth:'900px', margin: '0 auto'}}>
          <h1 style={this.styles.gameTitle}>Quid: The Game of Outrageous Political Shenanigans</h1>
          <Bench helpers={this.state.helpers} poweringUp={this.state.helperChange}/>
          <div style={this.styles.panel}>
            <Scoreboard state={this.state} gameOver={isGameOver}/>
            {allHolders}
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
