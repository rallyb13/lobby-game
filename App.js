import React from 'react';
import QuidStore from './store';
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
      <div style={this.styles.mainPage}>
        <div style={{width:'900px', margin: '0 auto'}}>
          <h1 style={this.styles.gameTitle}>Quid: The Game of Outrageous Political Shenanigans</h1>
          <Grid board={this.state.board}/>
          <div style={this.styles.panel}>
            <Scoreboard state={this.state} />
            <div><Staging stagedToken={this.state.stagedToken} /></div>
          </div>
        </div>
      </div>
    );
  },

  onChange: function() {
    this.setState(QuidStore.getCurrentState());
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
