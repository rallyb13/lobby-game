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
    var negativeBal = this.props.state.bankBalance < this.props.state.nextGoal,
      moveCount = this.props.state.movesRemaining,
      username = this.props.state.userInfo.userName,
      displayName = username === '' ? 'Login' : username,
      textColor = (negativeBal && moveCount <= 20 && moveCount > 0) ? 'red' : 'black';

    return (
      <div style={this.styles.scoreboard}>
        <h3 style={this.styles.heading}>White Paper</h3>
        <h4 onClick={this.handleLogin}>{displayName}</h4>
        <div style={this.styles.bodyBoard}>
          <Staging stagedToken={this.props.state.stagedToken} />
          <MemoButton/>
          <Score score={this.props.state.score} />
          <Bank bankBalance={this.props.state.bankBalance} textColor={textColor} />
          <Office electedOffice={this.props.state.electedOffice} />
          <MoveCounter movesRemaining={this.props.state.movesRemaining} phase={this.props.state.phase} textColor={textColor} />
          <NextGoal nextGoal={this.props.state.nextGoal} textColor={textColor} />
          
        </div>
      </div>
    );
  },

  handleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      QuidStore.setUser(user.displayName);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
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
