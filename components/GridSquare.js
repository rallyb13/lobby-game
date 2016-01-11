import React from 'react';
import Token from './Token';

var GridSquare = React.createClass({
  render: function(){

    return (
      <div style={this.styles.gridSquare} ><Token /></div>
    );
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
