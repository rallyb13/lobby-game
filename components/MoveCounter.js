import React from 'react';

var MoveCounter = React.createClass({
  render: function(){
    var txt = this.props.phase <=32 ? "Days Until Next Election" : "Days as Winner"
    return (
      <div>
        <h5>{txt}: {this.props.movesRemaining}</h5>
      </div>
    );
  }
});

export default MoveCounter;
