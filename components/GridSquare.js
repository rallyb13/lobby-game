import React from 'react';
import QuidStore from '../store';
import Utils from '../utils';
import Token from './Token';

var GridSquare = React.createClass({
  componentWillMount: function(){
    this.setState({tokenGroup: this.props.token.slice(0,3)});
  },

  render: function(){
    this.setColors(this.state.tokenGroup);
    return (
      <div ref={this.refs.square} onClick={this.placeToken} style={this.styles.gridSquare} >
        <Token symbol={this.props.token} /></div>
    );
  },

  placeToken: function(){
    var rowPos = this.props.rowPos,
        colPos = this.props.colPos;

    if (QuidStore.checkEmpty(rowPos, colPos) === true) {
      QuidStore.completeMove(rowPos, colPos);
      // this.setState({tokenGroup: this.props.token.slice(0,3)});
    }
  },

  setColors: function(tokenGroup){
    this.styles.gridSquare.color = Utils.handleColors(tokenGroup, 'color');
    this.styles.gridSquare.backgroundColor = Utils.handleColors(tokenGroup, 'bColor');
  },

  styles: {
     gridSquare: {
      height: '16.29%',
      width: '16.66%',
      outline: '1px solid #141414',
      color: '#4B5043',
      display: 'inline-block',
      position: 'relative',
      minHeight: '90px',
      minWidth: '90px'
     }
  }

});

export default GridSquare
