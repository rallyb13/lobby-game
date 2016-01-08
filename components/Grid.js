import React from 'react';
import GridSquare from './GridSquare';

var Grid = React.createClass({
  render: function(){
    var squares = [],
        rowNum = 6,
        colNum = 6,
        count = 0,
        i,
        j;

    for (i=0; i < rowNum; i++) {
      for (j=0; j < colNum; j++) {
        count++;
        squares.push(<GridSquare x={j+1} y={i+1} id={count}/>);
      }
    }

    return (
      <div style={this.styles.mainGrid} >
        { squares }
      </div>
    );
  },

  styles: {
      mainGrid: {
          backgroundColor: "limegreen",
          height: "100%",
          width: "69%",
          display: 'inline-block'
      }
  }

});

export default Grid
