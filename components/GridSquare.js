import React from 'react';
import QuidStore from '../store';
import Utils from '../utils';
import Token from './Token';
import Radium from 'radium';

var GridSquare = React.createClass({

  render: function(){
    var tokenGroup = this.props.token.slice(0,3),
      selected = this.props.aboutToGo;
    return React.cloneElement(
      <div onClick={this.placeToken} >
        <Token symbol={this.props.token} />
      </div>,
      { style:
        {
          color : Utils.handleColors(tokenGroup, 'color'),
          backgroundColor: Utils.handleColors(tokenGroup, 'bColor', selected),
          ':hover': {backgroundColor: Utils.handleColors(tokenGroup, 'hover')},
          height: '16.29%',
          width: '16.66%',
          display: 'inline-block',
          position: 'relative',
          marginBottom: '-4px',
          minHeight: '90px',
          minWidth: '90px'
        }
      }
    );
  },

  placeToken: function(){
    if (this.props.eligible) {
      QuidStore.completeMove(this.props.rowPos, this.props.colPos);
    }
  },

  // handleAboutToGo: function(selected, tokenGroup){
  //   if (selected){
  //     return 'magenta';
  //   } else {
  //     return Utils.handleColors(tokenGroup, 'bColor');
  //   }
  // }
});

export default Radium(GridSquare);
