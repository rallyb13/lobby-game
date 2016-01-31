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
      this.usePowerUp(token);
    } else {
      QuidStore.useAppeasement(token);
    }
  },

  pickSide: function(powerUp){
    return powerUp ? 'left' : 'right';
  },

  usePowerUp: function(token){
    var type = token.slice(0,3),
      cons;

    if (type === 'oil') {
      QuidStore.deposit(25000);
    } else if (type === 'agr'){
      QuidStore.freezeCons();
    } else if (type === 'mil'){
      cons = QuidStore.findTokenCoords('con1');
      QuidStore.clearMatches(cons);
    } else {
      QuidStore.deposit(250000);
    }
    QuidStore.changeHelperCount(token);
  }
});

export default BenchSeat;
