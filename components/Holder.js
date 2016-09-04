import React from 'react';
import Token from './Token';
import QuidStore from '../store';

var Holder = React.createClass({
  render: function(){
    return(
      <div className='hold-area' onClick={this.toggleTokens}>
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
  }
});

export default Holder;
