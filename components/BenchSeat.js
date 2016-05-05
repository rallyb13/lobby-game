import React from 'react';
import Token from './Token';
import QuidStore from '../store';
import Utils from '../utils';

var BenchSeat = React.createClass({
  render: function(){
    var favor = this.props.favor,
      selected = this.props.selected,
      tokenGroup = this.props.token.slice(0,3),
      count = favor ? this.props.count : " ";

    return React.cloneElement(
      <div onClick={this.useHelper}>
        <Token symbol={this.props.token} />
        <span style={{color:'white'}}> {count} </span>
      </div>,
      { style:
        {
          float: this.pickSide(favor),
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

  //delegates appropriate action for favor vs. appeasement selection
  useHelper: function(){
    var token = this.props.token;

    if (this.props.favor){
      this.useFavor(token);
    } else {
      QuidStore.selectThisToken(token);
    }
  },

  //sorts favors left, appeasements right
  pickSide: function(favor){
    return favor ? 'left' : 'right';
  },

  //delegates favor actions by category to QuidStore helper fn, decrements favors available
  useFavor: function(token){
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
    QuidStore.changeHelperCount(token, true);
  }
});

export default BenchSeat;
