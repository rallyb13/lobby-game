import React from 'react';
import QuidStore from '../../store';
import Utils from '../../utils';
import Token from '../Token';

var GridSquare = React.createClass({

  render: function(){
    var tokenGroup = this.props.token.slice(0,3),
      selected = this.props.aboutToGo,
      rowCount = this.props.board.rows,
      colCount = this.props.board.columns;

    return React.cloneElement(
      <div className={this.props.eligible ? "eligible grid-square" : 'grid-square'} onClick={this.placeToken} >
        <Token symbol={this.props.token} />
      </div>,
      { style:
        {
          backgroundColor: Utils.handleColors(tokenGroup, 'bColor', selected),
          outlineColor: Utils.handleColors(tokenGroup, 'bColor', selected),
          height: this.handlePercentage(rowCount),
          width: this.handlePercentage(colCount),
        }
      }
    );
  },

  //passes coordinates selected for (eligible) stagedToken placement, initiates completeMove state changes
  placeToken: function(){
    if (this.props.eligible && !this.props.gameOver && !this.props.noMoves) {
      QuidStore.completeMove(this.props.rowPos, this.props.colPos);
    }
  },

  //handles size of GridSquare, determined by how many rows/cols board has
  handlePercentage(count){
    var percentages = { 6: '16.66%', 7: '14.28%', 8: '12.49%'}
    return percentages[count];
  }
});

export default GridSquare;
