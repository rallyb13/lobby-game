import React from 'react';
import Token from './Token';
import QuidStore from '../store';

var Holder = React.createClass({
  render: function(){
    return(
      <div style={this.styles.holdArea} onClick={this.toggleTokens}>
        <Token symbol={this.props.token}/>
      </div>
    );
  },

  //handles either setting a token into hold area or removing it
  toggleTokens: function(){
    var token = this.props.token;

    if (token === ""){
      QuidStore.holdTokenHere(this.props.position);
    } else {
      QuidStore.useHeldToken(this.props.position, token);
    }
  },

  styles: {
    holdArea: {
      backgroundColor: 'maroon',
      minWidth: '77.5px',
      border: '1px solid red'
    }
  }
});

export default Holder;
