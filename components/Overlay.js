import React from 'react'


var Overlay = React.createClass({
  render(){
    var helpTabs = this.getHelpTabs(this.props.phase);
    
    return(
      <div className="modal">
        <div className="leftPanel">
          <p>This is where dude goes</p>
          <div>{helpTabs}</div>
        </div>
        <div>
          <p>This is where the close button goes.</p>
          <p>This is where the main panel goes.</p>
        </div>
      </div>
    )
  },
  
  getHelpTabs: function(currentPhase){
    var tabList = {
      'Current Election': 0,
      'Oil Lobby': 1,
      'Constituents & Appeasements': 1,
      'Megaphone': 2,
      'Hold Spaces': 3,
      'Agribusiness Lobby': 7,
      'Pork': 8,
      'Military-Industrial Lobby': 15,
      'Financial Lobby': 20
    },
    tabs = [];
    
    for (var key in tabList){
      if (tabList[key] <= currentPhase){
        tabs.push(<p>{key}</p>);
      }
    }
    return tabs;
  }
})

export default Overlay