import React from 'react';
import Utils from '../utils';

var Message = React.createClass({
  render: function(){
    var msg = this.props.alert ?
        <p style={this.styles.alert}> {this.props.message} </p> :
        <p>{this.props.message}</p>,
      end = this.props.gameOver,
      endMsg,
      showMsg;

    if (end){
      endMsg = this.endGame(end),
      showMsg = <p style={this.styles.alert}> {endMsg} </p>
    } else {
      showMsg = msg;
    }

    return (
      <div>
        {showMsg}
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
      color: 'maroon'
    }
  }
});

export default Message;
