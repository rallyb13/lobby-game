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
      border: '1px solid #000',
      height: '16.4%',
      width: '16.4%',
      color: 'white',
      margin: 0,
      display: 'inline-block'
     }
  }

});

export default GridSquare
