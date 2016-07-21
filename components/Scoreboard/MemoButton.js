import React from 'react';

var MemoButton = React.createClass({
  render: function(){

    return (
      <button onClick={this.openModal} style={this.styles.chiefButton}>Chief of Staff</button>
    );
  },
  
  openModal: function() {
    document.getElementById('modal').style.display = 'block';
  },
  
  styles: {
    chiefButton: {
      fontSize: '1.5em',
      marginTop: '10px'
    }
  }
});

export default MemoButton;