import React from 'react';
import Utils from '../../utils';

var NextGoal = React.createClass({
  render: function(){
    return (
      <div>
        <h5 style={{color: this.props.textColor}} >Next Goal: ${Utils.formatNum(this.props.nextGoal)}</h5>
      </div>
    );
  },
});

export default NextGoal
