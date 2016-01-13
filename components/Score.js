import React from 'react';

var Score = React.createClass({
  render: function(){
    return (
      <div>
        <h5 style={this.styles.score}> Score: {this.props.score} </h5>
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
