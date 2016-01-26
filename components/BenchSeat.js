import React from 'react';
import Token from './Token';

var BenchSeat = React.createClass({
  render: function(){
    var helpers = this.props.helpers;
    return (
      <div style={this.styles.seat} >
        <Token symbol={this.props.token} />
        <span> {this.props.count} </span>
      </div>
    );
  },

  styles: {
    seat: {
      float: 'left',
      width: '60px',
      height: '60px',
      display: 'inline-block',
      position: 'relative',
      padding: '5px'
    }
  }
});

export default BenchSeat;
