import React from 'react';
import Utils from '../../utils';

var HighOffice = React.createClass({
  render: function(){
    var highOffices: this.props.highOffice;
    var currentOffice: this.props.currentOffice;
    var displayOffice = this.checkHighOffice(highOffices, currentOffice);

    return (
      <div>
        <h5> Highest Held Office: {this.props.displayOffice}</h5>
      </div>
    );
  },

  checkHighOffice: function(highOffices, currentOffice) {
    var electedOfficeMap = [
      {office: 'State Delegate', rank: 1},
      {office: 'State Senator', rank: 2},
      {office: 'US Representative', rank: 3},
      {office: 'US Senator (Junior)', rank: 4},
      {office: 'US Senator (Senior)', rank: 5}
    ]
    //electedOfficeMap.map()
  }
});

export default HighOffice
