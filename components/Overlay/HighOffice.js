import React from 'react';
import Utils from '../../utils';

var HighOffice = React.createClass({
  render: function(){
    var highOffice = this.props.highOffice;
    var currentOffice = this.props.currentOffice;
    var displayOffice = this.checkHighOffice(highOffice, currentOffice);

    return (
      <div>
        <h5> Highest Held Office: {displayOffice}</h5>
      </div>
    );
  },

  checkHighOffice: function(highOffice, currentOffice) {
    var electedOfficeMap = [
      {office: 'State Delegate', rank: 1},
      {office: 'State Senator', rank: 2},
      {office: 'US Representative', rank: 3},
      {office: 'US Senator (Junior)', rank: 4},
      {office: 'US Senator (Senior)', rank: 5}
    ]
    //electedOfficeMap.map()

    return displayOffice;
  }
});

export default HighOffice
