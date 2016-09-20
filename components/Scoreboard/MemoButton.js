import React from 'react';
import QuidStore from '../../store';

var MemoButton = React.createClass({
  render: function(){

    return (
      <div className="center">
        <button onClick={this.openModal} className='chief-button' >HELP MENU</button>
      </div>
    );
  },

  openModal: function() {
    QuidStore.toggleOverlay(true);
  }
});

export default MemoButton;
