import React from 'react'
import QuidStore from '../../store'

var Welcome = React.createClass({
  render(){
    var data = QuidStore.getFirebaseData(),
        noData = Object.keys(data).length === 0, // if no data, basic welcome
      headline = noData ? <h5>Would You Like To Login?</h5>
        : <h5>You Already Had a Saved Game! Which One Do You Want?</h5>,
      button1 = noData ? <button className='loginOption' onClick={this.onNewGame}>No Thanks</button>
        : <button className='loginOption' onClick={this.onSaveCurrent}>Continue Current Game</button>,
      button2 = noData ? <button className='loginOption' onClick={this.onLogin}>Yes, with Google</button>
        : <button className='loginOption' onClick={this.onGetOldGame}>Gimme my Old Game</button>

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
    QuidStore.preserveHighScoreRecord();
    QuidStore.emitChange(); // now that logged in, will write game data to database
    this.cleanupModal();
  },
  
  onGetOldGame: function(){
    QuidStore.preserveHighScoreRecord();
    QuidStore.retrievePriorGame(false);
    this.cleanupModal();
  },
  
  cleanupModal: function() {
    document.getElementById('welcomeScreen').style.display = 'none';
    QuidStore.toggleOverlay(false);
  }

})

export default Welcome