import React from 'react';
import BenchSeat from './BenchSeat';

var Bench = React.createClass({
  render: function(){
    var seats = [],
      helpers = this.props.helpers,
      tokens = Object.keys(helpers),
      favor,
      token,
      count,
      i;

    for (i=0; i < tokens.length; i++){
      token = tokens[i];
      favor = token.slice(3,4) === '6';
      count = helpers[token];
      if (count > 0){
        seats.push(<BenchSeat token={token} count={count} favor={favor} selected={this.props.poweringUp === token} staged={this.props.staged} key={i} />);
      }
    }

    return (
      <div style={this.styles.bench}>
        {seats}
      </div>
    );
  },

  styles: {
    bench: {
      color: 'white',
      backgroundColor: '#966F33',
      height: '70px',
      float: 'right',
      marginRight: '5px',
      width: '500px',
      display: 'block',
      position: 'relative'
    }
  }
});

export default Bench;
