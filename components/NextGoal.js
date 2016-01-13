import React from 'react';

var NextGoal = React.createClass({
  render: function(){
    return (
      <div style={this.styles.nextGoal}>
        <h5>Next Goal: ${this.props.nextGoal}</h5>
      </div>
    );
  },

  styles: {
     nextGoal: {
      padding: 10
    }
  }

});

export default NextGoal
