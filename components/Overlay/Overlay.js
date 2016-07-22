import React from 'react'
import HelpTab from './HelpTab'
import Banner from './Banner'

var Overlay = React.createClass({
  render(){
    var helpTabs = this.getHelpTabs(this.props.phase);
    
    return(
      <div className="modal" id="modal">
        <h3 className='closeButton' onClick={this.closeModal}>X</h3>
        <div className="leftPanel">
          <p>This is where dude goes</p>
          <div>{helpTabs}</div>
        </div>
        <div>
          <Banner isGameOver={this.props.isGameOver} moves={this.props.moves} office={this.props.office}/>
          <p>This is where the main panel goes.</p>
        </div>
      </div>
    )
  },
  
  closeModal: function() {
    document.getElementById('modal').style.display = 'none';
  },
  
  getHelpTabs: function(currentPhase){
    var tabList = {
      'Current Election': 0,
      'Oil Lobby': 1,
      'Constituents': 1,
      'Megaphone': 2,
      'Hold Spaces': 3,
      'Agribusiness Lobby': 7,
      'Pork': 8,
      'Arms Lobby': 15,
      'Financial Lobby': 20
    },
    tabs = [];
    
    for (var key in tabList){
      if (tabList[key] <= currentPhase){
        tabs.push(<HelpTab resourceName={key} key={key}/>);
      }
    }
    return tabs;
  }
})

export default Overlay