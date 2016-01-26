import React from 'react';
import Token from './Token';

var Bench = React.createClass({
  render: function(){
    return (
      <div style={this.styles.bench}>
        <Token style={this.styles.token} symbol='oil1' />
        <Token symbol='agr1' />
        <Token symbol='mil1' />
        <Token symbol='fin1' />
        <Token symbol='con1' />
        <Token symbol='con1' />
        <Token symbol='con1' />
      </div>
    );
  },

  styles: {
    bench: {
      color: 'white',
      backgroundColor: 'blue',
      height: '100px',
      float: 'left',
      width: '50%',
      display: 'block',
      position: 'relative'
    },
    token: {
      float: 'left'
    }
  }
});

export default Bench;
