
import React from 'react';

var Menu = React.createClass({
  handleUndo() {
    this.props.undoLastTurn()
  },
  handleRestart() {
    this.props.restartBoard()
  },
  render: function(){
    return (
      <ul style={this.styles.menu}>
        <li style={this.styles.listItem}>Login</li>
        <li onClick={this.handleRestart} style={this.styles.listItem}>Restart</li>
        <li style={this.styles.listItem}>Help</li>
        <li onClick={this.handleUndo} style={this.styles.listItem}>Undo</li>
      </ul>
    )
  },

  styles: {
    menu: {
      listStyle: 'none',
      margin: '5px',
      padding: '5px'
    },
    listItem: {
      display: 'inline-block',
      padding: '5px'
    }
  }
});

export default Menu;
