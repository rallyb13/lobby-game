import React from 'react';
var classNames = require('classnames');

var Token = React.createClass({
  render: function(){
    var symbol = this.props.symbol || [''];
    var symbolClass = classNames({
      'icon-oil-drop': this.props.symbol === 'oil1',
      'icon-oil-can': this.props.symbol === 'oil2',
      'icon-derrick': this.props.symbol === 'oil3',
      'icon-refinery': this.props.symbol === 'oil4',
      'icon-pipeline': this.props.symbol === 'oil5',

      'icon-seed': this.props.symbol === 'agr1',
      'icon-corn': this.props.symbol === 'agr2',
      'icon-cow': this.props.symbol === 'agr3',
      // 'icon-': this.props.symbol === 'agr4',
      'icon-fast-food': this.props.symbol === 'agr5',

      'icon-bullet': this.props.symbol === 'mil1',
      'icon-gun': this.props.symbol === 'mil2',
      'icon-assult-rifle': this.props.symbol === 'mil3',
      'icon-missle': this.props.symbol === 'mil4',
      'icon-tank': this.props.symbol === 'mil5',

      'icon-coin': this.props.symbol === 'fin1',
      'icon-dollar': this.props.symbol === 'fin2',
      'icon-money-bag': this.props.symbol === 'fin3',
      'icon-bank': this.props.symbol === 'fin4',
      'icon-tower': this.props.symbol === 'fin5',

      'icon-vote': this.props.symbol === 'con1',
      'icon-megaphone': this.props.symbol === 'mega'
    });

    return (
      <div style={this.styles.token} className="token">
          <img style={this.styles.img} alt={symbolClass} src={symbolClass ? `../assets/icons/` + symbolClass + '.jpg' : ''} />
      </div>
    );
  },

  styles: {
     token: {
    },

     img: {
       fontSize: '10px',
       maxWidth: '100px'
     }
  }

});

export default Token
