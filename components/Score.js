import React from 'react';

var Score = React.createClass({
  render: function(){
    var points = 0;

    return (
      <div>
        <h5> Score: {points} </h5>
      </div>
    );
  }
});

export default Score
