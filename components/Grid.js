import React from 'react';
import GridSquare from './GridSquare';

var Grid = React.createClass({
  render: function(){
    var squares = [],
        rowNum = this.props.board.rows,
        colNum = this.props.board.columns,
        count = 0,
        i,
        j;

    for (i=0; i < rowNum; i++) {
      for (j=0; j < colNum; j++) {
        count++;
        squares.push(<GridSquare rowPos={i} colPos={j} token={this.props.board.grid[i][j]} id={count}/>);
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
          backgroundColor: "forestgreen",
          height: "900px",
          width: "69%",
          display: 'inline-block',
          borderRadius: '10%'
      }
  }

});

export default Grid
