import React from 'react'
import QuidStore from '../../store'

var Welcome = React.createClass({
  render(){
    return(
      <div>
        <button onClick={this.onNewGame}>START NEW GAME</button>
        <button onClick={this.onLogin}>LOGIN TO RESUME</button>
      </div>
    )
  },
  
  onNewGame: function(){
    QuidStore.populateBoard();
    document.getElementById('welcomeScreen').style.display = 'none';
    QuidStore.toggleOverlay(false);
  },
  
  onLogin: function(){
    QuidStore.handleLogin()
    document.getElementById('welcomeScreen').style.display = 'none';
    QuidStore.toggleOverlay(false);
  }
  
  //TODO: hide overlay X-close for this first choice
})

export default Welcome