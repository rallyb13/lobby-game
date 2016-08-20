import React from 'react';
import QuidStore from '../../store';

var Menu = React.createClass({
  render: function(){
    var username = this.props.username,
        displayName = username === '' ? 'Login' : username;
    return (
      <ul style={this.styles.menu}>
        <li style={this.styles.listItem} onClick={this.handleLogin}>{displayName}</li>
      </ul>
    )
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
    menu: {
      listStyle: 'none',
      margin: '5px',
      padding: '5px'
    },
    listItem: {
      display: 'inline-block',
      padding: '5px'
    }
  }
  
});

export default Menu;
