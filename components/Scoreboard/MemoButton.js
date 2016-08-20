import React from 'react';
import QuidStore from '../../store';

var MemoButton = React.createClass({
  render: function(){

    return (
      <button onClick={this.openModal} style={this.styles.chiefButton}>Chief of Staff</button>
    );
  },
  
  openModal: function() {
    QuidStore.toggleOverlay(true);
  },
  
  styles: {
    chiefButton: {
      fontSize: '1.5em',
      marginTop: '10px'
    }
  }
});

export default MemoButton;