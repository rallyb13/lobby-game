import React from 'react';
import Utils from '../../utils';

var Score = React.createClass({
  render: function(){
    return (
      <div>
        <h5> Score: {Utils.formatNum(this.props.score)} </h5>
      </div>
    );
  },
});

export default Score
