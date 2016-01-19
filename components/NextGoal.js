import React from 'react';
import Utils from '../utils';

var NextGoal = React.createClass({
  render: function(){
    return (
      <div>
        <h5>Next Goal: ${Utils.formatNum(this.props.nextGoal)}</h5>
      </div>
    );
  },
});

export default NextGoal
