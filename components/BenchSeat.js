import React from 'react';
import Token from './Token';

var BenchSeat = React.createClass({
  render: function(){
    var helpers = this.props.helpers;
    return (
      <div>
        <Token symbol={this.props.token} />
      </div>
    );
  }
});

export default BenchSeat;
