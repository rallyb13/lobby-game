import React from 'react';
import Token from './Token';
import QuidStore from '../store';
import Utils from '../utils';

var BenchSeat = React.createClass({
  render: function(){
    var powerUp = this.props.powerUp,
      selected = this.props.selected,
      tokenGroup = this.props.token.slice(0,3);

    return React.cloneElement(
      <div onClick={this.useHelper}>
        <Token symbol={this.props.token} />
        <span style={{color:'white'}}> {this.props.count} </span>
      </div>,
      { style:
        {
          float: this.pickSide(powerUp),
          color: Utils.handleColors(tokenGroup, 'color'),
          backgroundColor: Utils.handleColors(tokenGroup, 'bColor', selected),
          width: '60px',
          height: '60px',
          display: 'inline-block',
          position: 'relative',
          padding: '5px'
        }
      }
    );
  },

  useHelper: function(){
    var token = this.props.token;

    if (this.props.powerUp){
      QuidStore.usePowerUp(token);
    } else {
      QuidStore.useAppeasement(token);
    }
  },

  pickSide: function(powerUp){
    return powerUp ? 'left' : 'right';
  }
});

export default BenchSeat;
