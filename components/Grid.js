import React from 'react';
import QuidStore from '../store';
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
        squares.push(<GridSquare rowPos={i} colPos={j} token={this.props.board.grid[i][j]} eligible={this.checkDrop(i, j)} key={count}/>);
      }
    }

    return (
      <div style={this.styles.mainGrid} >
        { squares }
      </div>
    );
  },

  checkDrop: function(rowPos, colPos){
    return QuidStore.isEligible(rowPos, colPos);
  },

  styles: {
      mainGrid: {
          backgroundColor: '#A4BD99',
          height: "100%",
          width: "69%",
          display: 'inline-block',
          marginTop: '20px',
          marginBottom: '20px',
          //Set min-width so always have 6 columns
          minWidth: '550px'
      }
  }

});

export default Grid
