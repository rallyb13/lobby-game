import React from 'react';

var Message = React.createClass({
  render: function(){
    return (
      <div>
        <p>{this.props.message}</p>
      </div>
    );
  }
});

export default Message;
