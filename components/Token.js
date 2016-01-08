import React from 'react';

var Token = React.createClass({
  render: function(){
    var symbol = ['a'];

    return (
      <div style={this.styles.token}>{symbol}</div>
    );
  },

  styles: {
     token: {

     }
  }

});

export default Token