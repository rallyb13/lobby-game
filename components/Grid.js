import React from 'react';
import GridSquare from './GridSquare';

var Grid = React.createClass({
  render: function(){

    return (
      <div style={this.styles.mainGrid} >
          <GridSquare />
          <GridSquare />
          <GridSquare />
          <GridSquare />
          <GridSquare />
          <GridSquare />
          <GridSquare />
      </div>
    );
  },

  styles: {
      mainGrid: {
          backgroundColor: "limegreen",
          height: "900px",
          width: "900px"
      }
  }

});

export default Grid
