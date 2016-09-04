import React from 'react';
import QuidStore from '../../store';

var MemoButton = React.createClass({
  render: function(){

    return (
      <button onClick={this.openModal} className='chief-button' >Chief of Staff</button>
    );
  },
  
  openModal: function() {
    QuidStore.toggleOverlay(true);
  }
});

export default MemoButton;