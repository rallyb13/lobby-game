import React from 'react';
import QuidStore from '../store';

var NextSelect = React.createClass({
  render: function(){
    var advMsg = this.props.advMsg,
      displayButton;

    if (this.props.gameOver) {
      displayButton = <button style={this.styles.restart} onClick={this.restart}> Restart </button>;
    } else {
      displayButton = <div style={this.styles.choice}>
          <div>{advMsg}</div>
          <button style={this.styles.buttons} onClick={this.acceptAdvance} > Higher Office! </button>
          <button style={this.styles.buttons} onClick={this.refuseAdvance} > Am Comfy Here </button>
        </div>;
    }
    return(
      <div style={this.styles.container} >
        {displayButton}
      </div>
    );
  },

  restart: function() {
    document.clear();
    location.reload();
  },

  refuseAdvance: function(){
    var phase = this.props.phase,
      adjustment;

    if (phase === 5 || phase === 12){
      adjustment = 1;
    } else if (phase === 6 || phase === 13) {
      adjustment = 0;
      QuidStore.rerunPhase(true);
    } else if (phase === 19){
      adjustment = -1
      QuidStore.rerunPhase(true);
    }
    QuidStore.changePhase(adjustment);
  },

  acceptAdvance: function(phase, repeat){
    var phase = this.props.phase,
      repeat = this.props.repeat,
      adjustment;

    if (phase === 5 || phase === 12) {
      adjustment = 2;
    } else if (phase === 6 || phase === 13){
      adjustment = 1;
      QuidStore.rerunPhase(false);
    } else if (phase === 19){
      adjustment = repeat === 0 ? 1 : 3;
      QuidStore.rerunPhase(false);
    }
    QuidStore.changePhase(adjustment);
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
    restart: {
      margin: '25% 0 0 35%',
      padding: '5%'
    },
    choice: {
      margin: '10% 0 0 5%',
      padding: '5%'
    },
    buttons: {
      margin: '1% 2% 0 0'
    }
  }
});

export default NextSelect;
