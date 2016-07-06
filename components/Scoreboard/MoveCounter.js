import React from 'react';

var MoveCounter = React.createClass({
  render: function(){
    var txt = this.props.phase <=32 ? "Days Until Next Election" : "Days as Winner"
    return (
      <div>
        <h5 style={{color: this.props.textColor}} >{txt}: {this.props.movesRemaining}</h5>
      </div>
    );
  }
});

export default MoveCounter;
