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
    var negativeBal = this.props.status.bankBalance < this.props.status.nextGoal,
      moveCount = this.props.status.movesRemaining,
      username = this.props.userInfo.userName,
      displayName = username === '' ? 'Login' : username,
      textColor = (negativeBal && moveCount <= 20 && moveCount > 0) ? 'red' : 'black';

    return (
      <div style={this.styles.scoreboard}>
        <h3 style={this.styles.heading}>White Paper</h3>
        <h4 onClick={this.handleLogin}>{displayName}</h4>
        <div style={this.styles.bodyBoard}>
          <Staging stagedToken={this.props.stagedToken} />
          <MemoButton/>
          <Score score={this.props.status.score} />
          <Bank bankBalance={this.props.status.bankBalance} textColor={textColor} />
          <Office electedOffice={this.props.status.electedOffice} />
          <MoveCounter movesRemaining={this.props.status.movesRemaining} phase={this.props.status.phase} textColor={textColor} />
          <NextGoal nextGoal={this.props.status.nextGoal} textColor={textColor} />

        </div>
      </div>
    );
  },

  handleLogin() {
    function writeUserData(userId, name) {
        firebase.database().ref('users/' + userId).set({
          username: name
        });
    }
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      QuidStore.setUser(user);
      writeUserData(user.uid, user.displayName);
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
      border: '1px solid #818479',
      background: 'url(assets/crumpled_looseleaf.jpg)',
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundColor: '#DFDFDB',
      height: '50%',
      display: 'block',
      position: 'relative'
    },
    heading: {
      borderBottom: '1px solid #818479',
      textAlign: 'center'
    },
    bodyBoard: {
      padding: '0 10px',
    }
  }

});

export default Scoreboard
