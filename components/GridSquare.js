import React from 'react';
import QuidStore from '../store';
import Utils from '../utils';
import Token from './Token';

var GridSquare = React.createClass({

  render: function(){
    var tokenGroup = this.props.token.slice(0,3),
      selected = this.props.aboutToGo,
      rowCount = this.props.board.rows,
      colCount = this.props.board.columns;

    return React.cloneElement(
      <div className={this.props.eligible ? "grid-square" : ''} onClick={this.placeToken} >
        <Token symbol={this.props.token} />
      </div>,
      { style:
        {
          color : Utils.handleColors(tokenGroup, 'color'),
          backgroundColor: Utils.handleColors(tokenGroup, 'bColor', selected),
          // height: '16.29%',
          height: this.handleHeight(rowCount),
          // width: '16.66%',
          width: this.handleWidth(colCount),
          display: 'inline-block',
          position: 'relative',
          marginBottom: '-4px',
          minHeight: '85px',
          minWidth: '85px'
        }
      }
    );
  },

  placeToken: function(){
    if (this.props.eligible && !this.props.gameOver) {
      QuidStore.completeMove(this.props.rowPos, this.props.colPos);
    }
  },

  handleWidth(count){
    if (count === 6){
      return '16.66%';
    } else if (count === 7){
      return '14.28%';
    } else {
      return '12.49%';
    }
  },

  handleHeight(count){
    if(count===6){
      return '16.29%';
    } else if (count === 7){
      return '13.92%';
    } else {
      return '12.18%';
    }
  }
});

export default GridSquare;
