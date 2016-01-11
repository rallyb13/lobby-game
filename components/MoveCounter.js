import React from 'react';

var MoveCounter = React.createClass({
  render: function(){
    var moves = 730; //once level concept is implimented, this will be reset

    return (
      <div>
        <h5>Days Until Next Election: {moves}</h5>
      </div>
    );
  }
});

export default MoveCounter;
