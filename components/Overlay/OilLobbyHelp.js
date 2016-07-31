import React from 'react'

var OilLobbyHelp = React.createClass({
  render(){
    return (
      <div>
        <p>Match 3 oil drops together (non-diagonally) to create an oil can.</p>
        <img src="assets/help-images/match3oil.gif" />
        <p>Oil cans combine to make <b>derricks</b>, which make <b>pipelines</b>, which make <b>refineries</b>.</p>
        <div className="inline-help-images">
            <img src="assets/icons/icon-derrick.png" />
            <img src="assets/icons/icon-pipeline.png" />
            <img src="assets/icons/icon-refinery.png" />
        </div>
        <p>Refineries don&#39;t have to be placed together. Once you get 5 refineries onto the board, the oil lobby awards you a Favor, which appears on the helper bench above the game board.</p>
        <p>Click on the oil slick favor, and it becomes your next token. Place it anywhere on the board, and that row will get cleared out.</p>
      </div>
    )
  }
})

export default OilLobbyHelp
