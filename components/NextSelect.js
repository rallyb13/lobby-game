import React from 'react';
import QuidStore from '../store';

var NextSelect = React.createClass({
  render: function(){
    var restart = <button style={this.styles.button} onClick={this.restart}> Restart </button>,
      choice = <div><button>Advance</button><button>Stay</button></div>,
      // phase = this.props.phase,
      displayButton;

    if (this.props.gameOver) {
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

  restart: function(){
    document.clear();
    location.reload();
  },

  styles: {
    container: {
      backgroundColor: 'white',
      border: '5px double #000',
      borderRadius: '100%',
      height: '150px',
      display: 'block',
      position: 'relative',
      margin: '15px',
      padding: '5px'
    },
    button: {
      margin: '25% 0 0 35%',
      padding: '5%'
    }
  }
});

export default NextSelect;
