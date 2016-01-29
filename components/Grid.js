import React from 'react';
import QuidStore from '../store';
import GridSquare from './GridSquare';

var Grid = React.createClass({
  render: function(){
    var squares = [],
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
        squares.push(<GridSquare rowPos={i} colPos={j} token={token} eligible={this.checkDrop(i, j, token)} aboutToGo={this.checkUplift(i, j)} key={count} gameOver={this.props.gameOver}/>);
      }
    }

    return (
      <div style={this.styles.mainGrid} >
        { squares }
      </div>
    );
  },

  checkDrop: function(rowPos, colPos, token){
    var staged = this.props.stagedToken,
      isEmpty = token === '',
      validForMega = this.props.megaPossCoords,
      stringCoords;

    if (staged === 'mega'){
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

  checkUplift: function(rowPos, colPos){
    var fives = this.props.toPowerUp,
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

  styles: {
      mainGrid: {
          backgroundColor: '#A4BD99',
          height: "100%",
          width: "69%",
          display: 'inline-block',
          marginTop: '5px',
          marginBottom: '20px',
          //Set min-width so always have 6 columns
          minWidth: '550px'
      }
  }

});

export default Grid
