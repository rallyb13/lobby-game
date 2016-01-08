import React from 'react';

var Token = React.createClass({
  render: function(){
    var symbol = this.props.symbol || [''];

    return (
      <div style={this.styles.token}>{symbol}</div>
    );
  },

  styles: {
     token: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
     }
  }

});

export default Token