import React from 'react';
import Utils from '../../utils';

var Bank = React.createClass({
  render: function(){
    return (
      <div>
        <h5 style={{color: this.props.textColor}} >Bank Balance: ${Utils.formatNum(this.props.bankBalance)}</h5>
      </div>
    );
  },
});

export default Bank
