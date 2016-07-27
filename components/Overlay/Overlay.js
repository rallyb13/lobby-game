import React from 'react'
import QuidStore from '../../store'
import HelpTab from './HelpTab'
import Banner from './Banner'
import Funds from './Funds'
import NextSelect from './NextSelect';

var Overlay = React.createClass({
  render(){
    var helpTabs = this.getHelpTabs(this.props.gameData.phase),
        message = this.props.gameData.message,
        advMsg = this.props.gameData.advMsg,
        nextBit = advMsg === 'none' ? <div></div> : <NextSelect gameOver={this.props.isGameOver} advMsg={advMsg} phase={this.props.gameData.phase} repeat={this.props.gameData.repeat} />;
    
    return(
      <div className="modal" id="modal">
        <h3 className='closeButton' onClick={this.closeModal}>X</h3>
        <div className="leftPanel">
          <img src='../../assets/icons/chief-of-staff.png' alt='Chief of Staff'></img>
          <div>{helpTabs}</div>
        </div>
        <div>
          <Banner isGameOver={this.props.isGameOver} moves={this.props.gameData.movesRemaining} office={this.props.gameData.electedOffice}/>
          <div id='currentElection'>
            <Funds balance={this.props.gameData.bankBalance} goal={this.props.gameData.nextGoal} />
            <p>{message}</p>
            {nextBit}
          </div>
          <div id='helpDisplay'></div>
        </div>
      </div>
    )
  },
  
  closeModal: function() {
    document.getElementById('modal').style.display = 'none';
    if (this.props.gameData.movesRemaining === 0){
      QuidStore.handleElection(); //this will be replaced
    }
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
      'Military-Industrial Lobby': 15,
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