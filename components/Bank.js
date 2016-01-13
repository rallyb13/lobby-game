import React from 'react';

var Bank = React.createClass({
  render: function(){
    return (
      <div style={this.styles.bank}>
        <h5>Current Finances: ${this.props.money}</h5>
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
