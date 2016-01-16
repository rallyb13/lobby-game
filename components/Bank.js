import React from 'react';
import Utils from '../utils';

var Bank = React.createClass({
  render: function(){
    return (
      <div style={this.styles.bank}>
        <h5>Current Bank Balance: ${Utils.formatNum(this.props.bankBalance)}</h5>
      </div>
    );
  },

  styles: {
     bank: {
      padding: 10
    }
  }

});

export default Bank
