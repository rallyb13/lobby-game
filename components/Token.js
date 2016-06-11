import React from 'react';
var classNames = require('classnames');

var Token = React.createClass({
  render: function(){
    var symbolClass = classNames({
      'icon-oil-drop': this.props.symbol === 'oil1',
      'icon-oil-can': this.props.symbol === 'oil2',
      'icon-derrick': this.props.symbol === 'oil3',
      'icon-refinery': this.props.symbol === 'oil4',
      'icon-pipeline': this.props.symbol === 'oil5',

      'icon-seeds': this.props.symbol === 'agr1',
      'icon-corn': this.props.symbol === 'agr2',
      'icon-cattle': this.props.symbol === 'agr3',
      'icon-slaughter': this.props.symbol === 'agr4',
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
      'icon-park': this.props.symbol === 'con2',
      'icon-megaphone': this.props.symbol === 'mega'
    }),
    backgroundType = this.props.symbol !== '' ? 'url(../assets/icons/' + symbolClass + '.png) no-repeat center/contain' : 'inherit';

    return (
      <div style={{background: backgroundType, minHeight: '77.5px'}} />
    );
  },

});

export default Token
