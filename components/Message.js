import React from 'react';

var Message = React.createClass({
  render: function(){
    var msg = this.props.alert ?
      <p style={this.styles.alert}> {this.props.message} </p> :
      <p>{this.props.message}</p>;

    return (
      <div>
        {msg}
      </div>
    );
  },

  styles: {
    alert: {
      fontWeight: 700,
      color: 'maroon'
    }
  }
});

export default Message;
