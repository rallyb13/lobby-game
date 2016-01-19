import React from 'react';
var classNames = require('classnames');

var Token = React.createClass({
  render: function(){
    var symbol = this.props.symbol || [''];
    var symbolClass = classNames({
      'icon-oil-drop': this.props.symbol === 'a',
      'icon-oil-can': this.props.symbol === 'b',
      'icon-derrick': this.props.symbol === 'c',
      'icon-refinery': this.props.symbol === 'd',
      'icon-pipeline': this.props.symbol === 'e',
      'icon-vote': this.props.symbol === 'con'
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
