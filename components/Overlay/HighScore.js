import React from 'react';
import Utils from '../../utils';

var HighScore = React.createClass({

  render: function(){
    var highScores = this.props.highScore;
    var currentScore = this.props.currentScore;
    var displayScore = this.checkHighScore(highScores, currentScore);

    return (
      <div>
        <h5> High Score: {this.props.displayScore}</h5>
      </div>
    );
  },

  checkHighScore: function(highScores, currentScore) {
    var displayScore;
    for(var i=0; i<highScores.length; i++) {
      if (currentScore > highScores[i]) {
        highScores.push(currentScore);
        displayScore = currentScore;
      } else {
        displayScore = highScores[i];
      }
    }
    return displayScore;
  }
});

export default HighScore
