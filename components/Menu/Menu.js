import React from 'react';

var Menu = React.createClass({
  render: function(){
    return (
      <ul style={this.styles.menu}>
        <li style={this.styles.listItem}>Login</li>
        <li style={this.styles.listItem}>Restart</li>
        <li style={this.styles.listItem}>Help</li>
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