import React from 'react';

var Office = React.createClass({
  render: function(){
    return (
      <div>
        <h5>Elected Office: {this.props.electedOffice}</h5>
      </div>
    )
  }
});

export default Office;
