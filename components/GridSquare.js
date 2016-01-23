import React from 'react';
import QuidStore from '../store';
import Utils from '../utils';
import Token from './Token';

var GridSquare = React.createClass({

  render: function(){
    var tokenGroup = this.props.token.slice(0,3);
    return React.cloneElement(
      <div onClick={this.placeToken} >
        <Token symbol={this.props.token} />
      </div>,
      { style:
        {
          color : Utils.handleColors(tokenGroup, 'color'),
          backgroundColor: Utils.handleColors(tokenGroup, 'bColor'),
          height: '16.29%',
          width: '16.66%',
          outline: '1px solid #141414',
          display: 'inline-block',
          position: 'relative',
          minHeight: '90px',
          minWidth: '90px'
        }
    });
  },

  placeToken: function(){
    var rowPos = this.props.rowPos,
        colPos = this.props.colPos;

    if (QuidStore.checkEmpty(rowPos, colPos) === true) {
      QuidStore.completeMove(rowPos, colPos);
    }
  },

});

export default GridSquare
