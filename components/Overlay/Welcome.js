import React from 'react'
import QuidStore from '../../store'

var Welcome = React.createClass({
  render(){
    var data = QuidStore.getFirebaseData(),
        noData = Object.keys(data).length === 0, // if no data, basic welcome
      headline = noData ? <h5>Would You Like To Login?</h5>
        : <h5>You Already Had a Saved Game! Which One Do You Want?</h5>,
      button1 = noData ? <button onClick={this.onNewGame}>NO THANKS, JUST WANNA PLAY</button>
        : <button onClick={this.onSaveCurrent}>CONTINUE CURRENT GAME</button>,
      button2 = noData ? <button onClick={this.onLogin}>YES, I CAN LOG IN WITH GOOGLE</button>
        : <button onClick={this.onGetOldGame}>GIVE ME MY OLD GAME</button>

    return(
      <div>
        {headline}
        {button1}
        {button2}
      </div>
    )
  },
  
  onNewGame: function(){
    QuidStore.populateBoard();
    this.cleanupModal();
  },
  
  onLogin: function(){
    QuidStore.handleLogin(false);
    this.cleanupModal();
  },
  
  onSaveCurrent: function(){
    QuidStore.emitChange(); // now that logged in, will write game data to database
    this.cleanupModal();
  },
  
  onGetOldGame: function(){
    QuidStore.retrievePriorGame(false);
    this.cleanupModal();
  },
  
  cleanupModal: function() {
    document.getElementById('welcomeScreen').style.display = 'none';
    QuidStore.toggleOverlay(false);
  }

})

export default Welcome