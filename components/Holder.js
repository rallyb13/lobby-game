import React from 'react';
import Token from './Token';

var Holder = React.createClass({
  render: function(){
    return(
      <div style={this.styles.holdArea}>
        <Token symbol={this.props.token} />
      </div>
    );
  },

  styles: {
    holdArea: {
      backgroundColor: 'maroon',
      minWidth: '77.5px',
      border: '1px solid red'
    }
  }
});

export default Holder;
