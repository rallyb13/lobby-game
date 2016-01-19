import React from 'react';
import Utils from '../utils';

var Bank = React.createClass({
  render: function(){
    return (
      <div>
        <h5>Bank Balance: ${Utils.formatNum(this.props.bankBalance)}</h5>
      </div>
    );
  },
});

export default Bank
