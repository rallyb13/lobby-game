import React from 'react';

var GridSquare = React.createClass({
  render: function(){

    return (
      <div style={this.styles.gridSquare} >Look at me! Eep Eep Eeep Eeeeep</div>
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
