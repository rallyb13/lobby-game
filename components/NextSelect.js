import React from 'react';

var NextSelect = React.createClass({
  render: function(){
    return(
      <div style={this.styles.container} >
        <button style={this.styles.button} > Restart </button>
      </div>
    );
  },
  styles: {
    container: {
      backgroundColor: 'white',
      display: 'block',
      position: 'relative',
      margin: '15px',
      padding: '5px'
    },
    button: {
      marginLeft: '40%'
    }
  }
});

export default NextSelect;
