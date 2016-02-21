import React from 'react';
import Utils from '../utils';

var Message = React.createClass({
  render: function(){
    var end = this.props.gameOver,
      msg;

    if (end){
      msg = <p style={this.styles.alert}> {this.endGame(end)} </p>
    } else if (this.props.alert) {
      msg = <p style={this.styles.alert}> {this.props.message} </p>
    } else {
      msg = <p>{this.props.message}</p>
    }

    return (
      <div>
        {msg}
      </div>
    );
  },

  endGame: function(failType){
    var reason = 'Game Over. ',
      newLife = Utils.getPhaseData(this.props.phase).end;

    if (failType === 'board'){
      reason = reason + 'Talk about gridlock!'
    } else if (failType === 'bank'){
      reason = reason + 'Votes can be bought, just not always by you.'
    }
    reason = reason + " Fortunately, someone found you a new job, as " + newLife;
    return reason;
  },

  styles: {
    alert: {
      fontWeight: 700,
      color: 'white',
      backgroundColor: 'maroon',
      padding: '2px'
    }
  }
});

export default Message;
