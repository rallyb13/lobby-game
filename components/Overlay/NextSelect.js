import React from 'react';
import QuidStore from '../../store';

var NextSelect = React.createClass({
  render: function(){
    var advMsg = this.props.advMsg,
      displayButton;

    if (this.props.gameOver) {
      displayButton = <button className='choice-button' onClick={this.restart}> Restart </button>;
    } else if (advMsg !== 'none'){
      displayButton = <div>
          <div>{advMsg}</div>
          <button className='choice-button' onClick={this.acceptAdvance} > Higher Office! </button>
          <button className='choice-button' onClick={this.refuseAdvance} > Am Comfy Here </button>
        </div>;
      } else {
        displayButton = <button className='choice-button' onClick={this.continue}> Keep Running </button>;
      }

    return(
      <div>
        {displayButton}
      </div>
    );
  },

  //resets state object and starts new game
  restart: function() {
    QuidStore.restartGame();
  },

  continue: function() {
    if (this.props.phase === 19 && this.props.repeat % 3 === 2){
      QuidStore.rerunPhase(true);
      QuidStore.changePhase(-1, true);
    } else {
      QuidStore.changePhase(1, false);
    }
    QuidStore.toggleOverlay(false);
  },
  
  //handles choice of NOT running for next elected office, adjusting phase as needed
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
    QuidStore.toggleOverlay(false);
    QuidStore.changePhase(adjustment, true);
  },

  //handles choice of running for next elected office, adjusting phase as needed
  acceptAdvance: function(){
    var phase = this.props.phase,
      repeat = this.props.repeat,
      adjustment;

    if (phase === 5 || phase === 12) {
      adjustment = 2;
    } else if (phase === 6 || phase === 13){
      adjustment = 1;
      QuidStore.rerunPhase(false);
    } else if (phase === 19){
      adjustment = repeat % 3 === 0 ? 1 : 3;
      QuidStore.rerunPhase(false);
    }
    QuidStore.toggleOverlay(false);
    QuidStore.changePhase(adjustment, true); //should be able to add to repeat without bringing it through as props
  }
});

export default NextSelect;
