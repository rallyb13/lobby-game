import React from 'react';

var MoveCounter = React.createClass({
  render: function(){
    return (
      <div>
        <h5>Days Until Next Election: {this.props.movesRemaining}</h5>
      </div>
    );
  }
});

export default MoveCounter;
