import React from 'react';
import Grid from './components/Grid';
import Scoreboard from './components/Scoreboard';
import Staging from './components/Staging';

var App = React.createClass ({
  render(){
    return (
      <div style={this.styles.mainPage}>
        <div style={{width:'900px', margin: '0 auto'}}>
          <h1 style={this.styles.gameTitle}>Quid: The Game of Outrageous Political Shenanigans</h1>
          <Grid />
          <div style={this.styles.panel}>
            <Scoreboard />
            <div><Staging /></div>
          </div>
        </div>
      </div>
    );
  },

  styles: {
    mainPage: {
      background: 'url(images/DC-Night-Tour.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    gameTitle: {
        color: 'white'
    },
    panel: {
      width: '30%',
      float: 'right'
    },
  }
});
export default App
