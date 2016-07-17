import React from 'react';
import QuidStore from './store';
import Utils from './utils';
import Bench from './components/Bench/Bench';
import Grid from './components/Gameboard/Grid';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Holder from './components/Holder';
import Menu from './components/Menu/Menu';

var App = React.createClass ({
  //creates current board with randomly selected starting tokens and sets game-starting state object
  componentWillMount: function () {
    QuidStore.setupBoard();
    this.setState(QuidStore.getCurrentState());
    localStorage.setItem('thisTurn', JSON.stringify( QuidStore.getCurrentState() ) )
    localStorage.setItem('lastTurn', localStorage['thisTurn'] )
  },

  componentDidMount: function(){
    QuidStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function(){
    QuidStore.removeChangeListener(this.onChange);
  },

  //when user clicks undo, the current state is set to the last state, which was saved in localStorage
    undoLastTurn: function(){
        localStorage.setItem('thisTurn', localStorage['lastTurn'])
        this.setState(JSON.parse(localStorage['lastTurn']))
    },

  render(){
    var advMsg = this.state.advMsg,
        isGameOver = this.isGameOver(advMsg),
        holders = this.state.holdTokens,
        allHolders = [],
        i;

    if (holders.length > 1){
      for (i = 1; i < holders.length; i++){
        allHolders.push( <Holder token={this.state.holdTokens[i]} position={i} key={i} /> );
      }
    } else {
      allHolders.push ( <div key={0}></div> );
    }

    return (
      <div>
        <div className="main">
          <h1 style={this.styles.gameTitle}>Quid: The Game of Outrageous Political Shenanigans</h1>
          <div className="white-paper-panel">
            <Menu username={this.state.userInfo.username} restartBoard={this.restartBoard} undoLastTurn={this.undoLastTurn}/>
            <Scoreboard state={this.state} gameOver={isGameOver}/>
            <div style={this.styles.holders}>{allHolders}</div>
          </div>
          <Bench helpers={this.state.helpers} poweringUp={this.state.helperChange}/>
          <Grid board={this.state.board} stagedToken={this.state.stagedToken} megaPossCoords={this.state.megaPossCoords} toFavor={this.state.createFavor} gameOver={isGameOver} moves={this.state.movesRemaining} office={this.state.electedOffice}/>
        </div>
      </div>
    );
  },

  //when state object change is emitted, resets state so that changes can be filtered to appropriate components
  //localStorage API requires stringify when working with Objects
  onChange: function() {
    this.setState(QuidStore.getCurrentState());
    localStorage.setItem('lastTurn', localStorage['thisTurn'] )
    localStorage.setItem('thisTurn', JSON.stringify( QuidStore.getCurrentState() ) )

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
        color: '#000',
        padding: '10px, 25px'
    },
    holders: {
      display: 'inline-block',
      float: 'left'
    }
  }
});
export default App
