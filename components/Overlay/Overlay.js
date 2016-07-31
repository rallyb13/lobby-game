import React from 'react'
import QuidStore from '../../store'
import Utils from '../../utils'
import HelpTab from './HelpTab'
import Banner from './Banner'
import Funds from './Funds'
import NextSelect from './NextSelect'

import OilLobbyHelp from './Helps/OilLobbyHelp'
import ConstituentsHelp from './Helps/ConstituentsHelp'
import MegaphoneHelp from './Helps/MegaphoneHelp'
import HoldSpacesHelp from './Helps/HoldSpacesHelp'
import AgribusinessLobbyHelp from './Helps/AgribusinessLobbyHelp'
import PorkHelp from './Helps/PorkHelp'
import MilitaryIndustrialLobbyHelp from './Helps/MilitaryIndustrialLobbyHelp'
import FinancialLobbyHelp from './Helps/FinancialLobbyHelp'

var Overlay = React.createClass({
  render(){
    var helpTabs = this.getHelpTabs(this.props.gameData.phase),
        moves = this.props.gameData.movesRemaining,
        message = this.props.gameData.message,
        advMsg = this.props.gameData.advMsg,
        helpSelection = this.props.gameData.helpDetail,
        helpDetailEl = helpSelection ? this.getHelpComponent(helpSelection) : <div></div>,
        displayCase = moves === 0 || advMsg !== 'none',
        close = displayCase ? <p></p> : <h3 className='closeButton' onClick={this.closeModal}>X</h3>,
        nextBit = displayCase ?
            <NextSelect gameOver={this.props.isGameOver} advMsg={advMsg} moves={moves} phase={this.props.gameData.phase} repeat={this.props.gameData.repeat} /> :
            <div></div>;

    return(
      <div className="modal" id="modal">
        {close}
        <Banner isGameOver={this.props.isGameOver} moves={moves} office={this.props.gameData.electedOffice}/>
        <div className="modalWrapper">
            <div className="leftPanel">
              <img src='../../assets/icons/chief-of-staff.png' alt='Chief of Staff'></img>
              <div>{helpTabs}</div>
            </div>
            <div className="mainPanel">
              <div id='currentElection'>
                <Funds balance={this.props.gameData.bankBalance} goal={this.props.gameData.nextGoal} />
                <p>{message}</p>
                {nextBit}
              </div>
              <div id='helpDisplay' className="helpWrapper">
                {helpDetailEl}
              </div>
            </div>
        </div>
      </div>
    )
  },

  //calls utility function to close the modal
  closeModal: function() {
    Utils.toggleOverlay(false);
  },

  //finds all tabs relevant to current phase and below, creates corresponding helpTabs
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
  },

  // utility function left here where components are used, returns correct component by name
  getHelpComponent: function(selection){
    var components = {
      'Oil Lobby': <OilLobbyHelp />,
      'Constituents': <ConstituentsHelp />,
      'Megaphone': <MegaphoneHelp />,
      'Hold Spaces': <HoldSpacesHelp />,
      'Agribusiness Lobby': <AgribusinessLobbyHelp />,
      'Pork': <PorkHelp />,
      'Military-Industrial Lobby': <MilitaryIndustrialLobbyHelp />,
      'Financial Lobby': <FinancialLobbyHelp />
    };
    return components[selection];
  }
})

export default Overlay
