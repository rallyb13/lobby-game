import React from 'react';
var classNames = require('classnames');

var Token = React.createClass({
  render: function(){
    var symbolClass = classNames({
      'icon-oil-drop': this.props.symbol === 'oil1',
      'icon-oil-can': this.props.symbol === 'oil2',
      'icon-derrick': this.props.symbol === 'oil3',
      'icon-pipeline': this.props.symbol === 'oil4',
      'icon-refinery': this.props.symbol === 'oil5',
      'icon-oilslick': this.props.symbol === 'oil6',

      'icon-seeds': this.props.symbol === 'agr1',
      'icon-corn': this.props.symbol === 'agr2',
      'icon-cattle': this.props.symbol === 'agr3',
      'icon-slaughter': this.props.symbol === 'agr4',
      'icon-restaurant': this.props.symbol === 'agr5',
      'icon-greasefire': this.props.symbol === 'agr6',

      'icon-bullet': this.props.symbol === 'mil1',
      'icon-gun': this.props.symbol === 'mil2',
      'icon-AR-15': this.props.symbol === 'mil3',
      'icon-missile': this.props.symbol === 'mil4',
      'icon-tank': this.props.symbol === 'mil5',

      'icon-piggybank': this.props.symbol === 'fin1',
      'icon-safe': this.props.symbol === 'fin2',
      'icon-vault': this.props.symbol === 'fin3',
      'icon-bank': this.props.symbol === 'fin4',
      'icon-tower': this.props.symbol === 'fin5',

      'icon-vote': this.props.symbol === 'con1',
      'icon-park': this.props.symbol === 'con2',
      'icon-library1': this.props.symbol === 'con3',
      'icon-library2': this.props.symbol === 'con4',
      'icon-bridge1': this.props.symbol === 'con5',
      'icon-bridge2': this.props.symbol === 'con6',
      'icon-bridge3': this.props.symbol === 'con7',
      'icon-megaphone': this.props.symbol === 'mega'
    }),
    backgroundType = this.props.symbol !== '' ? 'url(../assets/icons/' + symbolClass + '.png) no-repeat top/contain' : 'inherit';

    return (
      <div style={{background: backgroundType, minHeight: '77.5px'}} />
    );
  },

});

export default Token
