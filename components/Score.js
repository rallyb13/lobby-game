import React from 'react';

var Score = React.createClass({
  render: function(){
    var points = 0;

    return (
      <div>
        <h5 style={this.styles.score}> Score: {points} </h5>
      </div>
    );
  },

  styles: {
    score: {
      paddingLeft: '10px'
    }
  }
});

export default Score
