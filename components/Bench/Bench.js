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
     <div className='bench-container'>
        <div className='labels'>
            <span>Favors</span><span>Appeasments</span>
        </div>
          <div className='bench'>
            {seats}
          </div>
      </div>
    );
  }
});

export default Bench;
