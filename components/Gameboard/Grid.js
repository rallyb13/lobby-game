import React from 'react';
import QuidStore from '../../store';
import GridSquare from './GridSquare';

var Grid = React.createClass({
  render: function(){
    var squares = [],
        noMoves = this.props.isOverlayUp,
        rowNum = this.props.board.rows,
        colNum = this.props.board.columns,
        count = 0,
        token,
        i,
        j;

    for (i=0; i < rowNum; i++) {
      for (j=0; j < colNum; j++) {
        count++;
        token = this.props.board.grid[i][j];
        squares.push(<GridSquare rowPos={i} colPos={j} token={token} noMoves={noMoves} eligible={this.checkDrop(i, j, token)} aboutToGo={this.checkUplift(i, j)} key={count} gameOver={this.props.gameOver} board={this.props.board}/>);
      }
    }

    return (
      <div className="game-grid" >
        { squares }
      </div>
    );
  },

  //checks stagedToken eligibility to be passed down as props to GridSquare
  //mostly just a check of isEmpty (or !isEmpty for pork),
  //but megaphone must be checked against eligibility list already made by store, passed as props
  checkDrop: function(rowPos, colPos, token){
    var staged = this.props.stagedToken,
      isEmpty = token === '',
      validForMega = this.props.board.megaPossCoords,
      stringCoords;

    if (staged === 'oil6'){
      return true;
    } else if (staged === 'mega'){
      if (isEmpty){
        stringCoords = [rowPos, colPos];
        stringCoords = JSON.stringify(stringCoords);
        return (validForMega.indexOf(stringCoords) !== -1);
      } else {
        return false;
      }
    } else if (staged === 'pork'){
      return !isEmpty;
    } else {
      return isEmpty;
    }
  },

  //pass style change to selected GridSquares when triggered by presence of data in toFavor props
  checkUplift: function(rowPos, colPos){
    var fives = this.props.board.createFavor,
      i;

    if (fives.length === 0){
      return false;
    } else {
      for (i = 0; i < fives.length; i++){
        if(rowPos === fives[i][0] && colPos === fives[i][1]){
          return true;
        }
      }
      return false
    }
  },
});

export default Grid
