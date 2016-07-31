import React from 'react'
import QuidStore from '../../store'

var HelpTab = React.createClass({
  render(){
    var text = this.props.resourceName;
    
    return(
      <div className='helpTab' onClick={this.displayHelp}>{text}</div>
    )
  },
  
  //toggles basic election info and dumb component containing help divs, calls helper function to set correct component on overlay
  displayHelp: function(){
    var resourceName = this.props.resourceName;

    if (resourceName === 'Current Election'){
      QuidStore.setHelpDetail(false);
      document.getElementById('helpDisplay').style.display = 'none';
      document.getElementById('currentElection').style.display = 'block';
    } else {
      document.getElementById('currentElection').style.display = 'none';
      document.getElementById('helpDisplay').style.display = 'block';
      QuidStore.setHelpDetail(resourceName);
    }
    //should also unset selection color of the other tabs and set selection color of current choice
  }
})

export default HelpTab