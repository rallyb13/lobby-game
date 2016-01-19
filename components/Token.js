import React from 'react';
var classNames = require('classnames');

var Token = React.createClass({
  render: function(){
    var symbol = this.props.symbol || [''];
    var symbolClass = classNames({
      'icon-seed': this.props.symbol === 'a',
      'icon-corn': this.props.symbol === 'b'
    });

    return (
      <div style={this.styles.token}><span className={symbolClass}></span></div>
    );
  },

  styles: {
     token: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '50px'
     }
  }

});

export default Token