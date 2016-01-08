import React from 'react';
import Grid from './components/Grid';
import Scoreboard from './components/Scoreboard';

class App extends React.Component {
  render(){
    return (
      <div style={{width:'900px', margin: '0 auto'}}>
        <h1>Quid: The Game of Outrageous Political Shenanigans</h1>
        <Grid />
        <Scoreboard />
      </div>
    );
  }
}
export default App
