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
      backgroundColor: '#D2E4C4',
      width: '77.5px',
      border: '1px solid #246EB9',
      float: 'left',
      margin: '5px'
    }
  }
});

export default Holder;
