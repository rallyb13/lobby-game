import React from 'react';
import Token from './Token';
import Utils from '../utils';

var BenchSeat = React.createClass({
  render: function(){
    var powerUp = this.props.powerUp,
      tokenGroup = this.props.token.slice(0,3);
    return React.cloneElement(
      <div>
        <Token symbol={this.props.token} />
        <span style={{color:'white'}}> {this.props.count} </span>
      </div>,
      { style:
        {
          float: this.pickSide(powerUp),
          color: Utils.handleColors(tokenGroup, 'color'),
          backgroundColor: Utils.handleColors(tokenGroup, 'bColor'),
          width: '60px',
          height: '60px',
          display: 'inline-block',
          position: 'relative',
          padding: '5px'
        }
      }
    );
  },

  pickSide: function(powerUp){
    return powerUp ? 'left' : 'right';
  }


});

export default BenchSeat;
