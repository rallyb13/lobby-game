import React from 'react'

var MilitaryIndustrialLobbyHelp = React.createClass({
  render(){
    return (
      <div>
        <p>Three <b>bullets</b> combine into <b>guns</b>, which combine for <b>assault rifles</b>.</p>
        <div className="inline-help-images">
          <img src="assets/icons/icon-bullet.png" />
          <img src="assets/icons/icon-gun.png" />
          <img src="assets/icons/icon-AR-15.png" />
        </div>
        <p>Those combine for <b>missles</b>. Then come <b>tanks</b>, which do not need to be placed together.</p>
        <div className="inline-help-images">
          <img src="assets/icons/icon-missile.png" />
          <img src="assets/icons/icon-tank.png" />
        </div>
        <p>Make enough <b>tanks</b> (especially when the Pentagon complains they don&#39;t even want them), and you earn a Favor from the Military-Industrial Lobby. In the helper bench above the game board, simply click on <b>The Draft</b> and you won&#39;t have to worry about constituents for a little while. A great response when they try to swarm you in protest.</p>
        <img src="assets/icons/icon-draft.png" />
      </div>
    )
  }
})

export default MilitaryIndustrialLobbyHelp