import React from 'react';
import Grid from './components/Grid';
import Scoreboard from './components/Scoreboard';
import Staging from './components/Staging';

var App = React.createClass ({
  render(){
    return (
      <div style={{width:'900px', margin: '0 auto'}}>
        <h1>Quid: The Game of Outrageous Political Shenanigans</h1>
        <Grid />
        <div style={this.styles.panel}>
          <Scoreboard />
          <div style={this.styles.symbolBlock}><Staging /></div>
        </div>
      </div>
    );
  },

  styles: {
    panel: {
      width: '30%',
      float: 'right'
    },
     symbolBlock: {
      height: '100px',
      display: 'block',
      position: 'relative',
      display: 'block',
     }
  }
});
export default App
