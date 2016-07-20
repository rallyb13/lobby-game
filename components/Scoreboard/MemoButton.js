import React from 'react';

var MemoButton = React.createClass({
  render: function(){
    var alertCount = this.props.alertCount,
        msgText = 'Chief of Staff',
        msg;
    
    if (alertCount === 1){
      msg = <button style={this.styles.alertOne} > {msgText + ': ' + alertCount + ' unread memo'}</button>;
    } else if (alertCount > 1){
      msg = <button style={this.styles.alertMulti}> {msgText + ': ' + alertCount + ' unread memos'}</button>;
    } else{
      msg = <button onClick={this.openModal} style={this.styles.noAlert}>{msgText}</button>
    }

    return (
      <div> {msg} </div>
    );
  },
  
  openModal: function() {
    document.getElementById('modal').style.display = 'block';
  },
  
  styles: {
    noAlert: {
      fontSize: '1.5em',
      marginTop: '10px'
    },
    alertOne: {
      fontWeight: 650,
      fontSize: '0.75em',
      color: 'white',
      backgroundColor: '#801919',
      marginTop: '10px'
    },
    alertMulti: {
      fontWeight: 750,
      fontSize: '0.75em',
      color: 'white',
      backgroundColor: '#800000',
      marginTop: '10px'
    }
  }
});

export default MemoButton;