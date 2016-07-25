import React from 'react'

var HelpTab = React.createClass({
  render(){
    var text = this.props.resourceName;
    
    return(
      <div className='helpTab' onClick={this.displayHelp}>{text}</div>
    )
  },
  
  displayHelp: function(){
    var resourceName = this.props.resourceName,
        resources = {
          'Oil Lobby': 1,
          'Constituents': 1,
          'Megaphone': 2,
          'Hold Spaces': 3,
          'Agribusiness Lobby': 7,
          'Pork': 8,
          'Military-Industrial Lobby': 15,
          'Financial Lobby': 20
        };

    //code to hide main display of Election info && link path for resource to background of panel
    if (resourceName === 'Current Election'){
      //display #currentElection; hide #helpDisplay
    } else {
      //hide #currentElection; display #helpDisplay; set #helpDisplay background image
      console.log(resources[resourceName]);
    }
    //should also unset selection color of the rest and set selection color of current choice
  }
})

export default HelpTab