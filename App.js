import React from 'react';
import QuidStore from './store';
import Bench from './components/Bench';
import Grid from './components/Grid';
import Scoreboard from './components/Scoreboard';
import Staging from './components/Staging';

var App = React.createClass ({
  componentWillMount: function () {
    QuidStore.setupBoard();
    this.setState(QuidStore.getCurrentState());
  },

  componentDidMount: function(){
    QuidStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function(){
    QuidStore.removeChangeListener(this.onChange);
  },

  render(){
    return (
      <div>
        <div style={{maxWidth:'900px', margin: '0 auto'}}>
          <h1 style={this.styles.gameTitle}>Quid: The Game of Outrageous Political Shenanigans</h1>
          <Bench helpers={this.state.helpers} poweringUp={this.state.helperChange}/>
          <div style={this.styles.panel}>
            <div><Staging stagedToken={this.state.stagedToken} /></div>
            <Scoreboard state={this.state} />
          </div>
          <Grid board={this.state.board} stagedToken={this.state.stagedToken} megaPossCoords={this.state.megaPossCoords} toPowerUp={this.state.createPowerUp}/>
        </div>
      </div>
    );
  },

  onChange: function() {
    this.setState(QuidStore.getCurrentState());
  },

  styles: {
    gameTitle: {
        color: 'white',
        padding: '10px, 25px'
    },
    panel: {
      width: '30%',
      float: 'right'
    },
  }
});
export default App
