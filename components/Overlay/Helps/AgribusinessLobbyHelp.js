import React from 'react'

var AgribusinessLobbyHelp = React.createClass({
  render(){
    return(
      <div>
        <p>The Agribusiness Lobby works much like the Oil Lobby. Match three patented (and non-reproducing) <b>seeds</b> together and you get a <b>corn</b> token.</p>
        <div className="inline-help-images">
          <img src="assets/icons/icon-seeds.png" />
          <img src="assets/icons/icon-corn.png" />
        </div>
        <p>The corns combine to make some fat <b>cattle</b>, which combine to make <b>slaughter houses</b>, which combine to make <b>Fat Food restaurants</b>.</p>
        <div className="inline-help-images">
          <img src="assets/icons/icon-cattle.png" />
          <img src="assets/icons/icon-slaughter.png" />
          <img src="assets/icons/icon-restaurant.png" />
        </div>
        <p>The Fat Food joints don&#39;t have to be placed together. Once you have enough, you&#39;ll earn a <b>Favor</b> from the Agribusiness lobby.</p>
        <img src="assets/icons/icon-corn-syrup.png" /> 
        <p>Use the <b>Corn Syrup</b> favor to really fatten up your agribusiness tokens. All but the <b>Fat Food Restaurants</b> become the next most valuable token.</p>
        <img src="assets/help-images/cornsyrup.gif" />
      </div>
    )
  }
})

export default AgribusinessLobbyHelp