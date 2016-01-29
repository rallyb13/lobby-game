import React from 'react';

var NextSelect = React.createClass({
  render: function(){
    var restart = <button style={this.styles.button} > Restart </button>,
      choice = <div><button>Advance</button><button>Stay</button></div>,
      // phase = this.props.phase,
      displayButton;

    if (gameOver) {
      displayButton = restart;
    } else {
      displayButton = choice;
    }
    return(
      <div style={this.styles.container} >
        {displayButton}
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
