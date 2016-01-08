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
      height: '105px',
      width: '16.66%',
      outline: '1px solid #000',
      color: 'white',
      backgroundColor: 'limegreen',
      margin: 0,
      display: 'inline-block',
      position: 'relative'
     }
  }

});

export default GridSquare
