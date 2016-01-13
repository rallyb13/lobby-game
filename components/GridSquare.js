import React from 'react';
import QuidStore from '../store';
import Token from './Token';

var GridSquare = React.createClass({
  render: function(){
    return (
      <div onClick={this.placeToken} style={this.styles.gridSquare} ><Token symbol={this.props.token} /></div>
    );
  },

  placeToken: function(){
    console.log(this.props.x);
    console.log(QuidStore.getCurrentState().stagedToken);
    this.setState({token: QuidStore.getCurrentState().stagedToken});
  },

  styles: {
     gridSquare: {
      height: '16.29%',
      width: '16.66%',
      outline: '1px solid #141414',
      color: 'white',
      display: 'inline-block',
      position: 'relative',
     }
  }

});

export default GridSquare
