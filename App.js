import React from 'react';
import QuidStore from './store';
import Utils from './utils';
import Firebase from 'firebase';
import Bench from './components/Bench/Bench';
import Grid from './components/Gameboard/Grid';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Holder from './components/Holder';
import Overlay from './components/Overlay/Overlay';

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
        holders = this.state.holdTokens,
        allHolders = [],
        overlay = this.state.isOverlayUp ?
          <Overlay gameData={this.state.status} isGameOver={isGameOver} helpDetail={this.state.helpDetail} userInfo={this.state.userInfo} />
          : <div></div>,
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
            <Scoreboard status={this.state.status} userInfo={this.state.userInfo} stagedToken={this.state.stagedToken}/>
            <div style={this.styles.holders}>{allHolders}</div>
          </div>
          <Bench helpers={this.state.helpers} poweringUp={this.state.helperChange} staged={this.state.stagedToken}/>
          <button type='button' id='undo' className='undo-button' onClick={this.handleUndo}>UNDO<span id='undo-cost' className='undo-cost'>($250)</span></button>
          <Grid board={this.state.board} stagedToken={this.state.stagedToken} gameOver={isGameOver} isOverlayUp={this.state.isOverlayUp}/>
          {overlay}
        </div>
      </div>
    );
  },

  //when state object change is emitted, resets state so that changes can be filtered to appropriate components
  //localStorage API requires stringify when working with Objects
  onChange: function() {
    this.setState(QuidStore.getCurrentState());
  },

  //
  handleUndo(){
    QuidStore.undoTurn();
  },

  //checks that board is not full and bank balance is still positive (at end of election cycle)
  isGameOver: function(){
    var advMsg = this.state.status.advMsg;

    if (advMsg === 'bank' || advMsg === 'board'){
      return advMsg;
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
