import React from 'react';

<<<<<<< HEAD
var GridSquare = React.createClass({
  render: function(){
=======
var GridSquare = React.createClass ({
  render: function(){
    var styles = {
       gridSquare: {
        border: '1px solid #000',
        height: '16.4%',
        width: '16.4%',
        color: 'white',
        margin: 0,
        display: 'inline-block'
       }
    }
>>>>>>> b85b918883582d4de84004c2d6bf5e9d8cdf351e

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
