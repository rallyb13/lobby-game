import React from 'react'

var ConstituentsHelp = React.createClass({
  render(){
    return (
      <div>
        <p><b>Constituents</b> are often displeased by your work with the lobbies. They still believe they have a voice and will show up to get in your way.</p>
        <img src="assets/icons/icon-vote.png" />
        <p>When they get to be too many, you should probably appease them with a <b>park</b>, or a <b>library</b>, or even a <b>bridge</b>. Select the appeasement from the right side of the helper bench above the game board.</p>
        <div className="inline-help-images">
            <img src="assets/icons/icon-park.png" />
            <img src="assets/icons/icon-library1.png" />
            <img src="assets/icons/icon-bridge1.png" />
        </div>
        <p>The appeasements cost money (the more expensive they are, the longer they should last), but they do get constituents out of your way. Once a constituent makes contact with an appeasement, they leave.</p>
        <img src="assets/help-images/park.gif" />
        <p>Beware, though. Constituents can also swarm. If you have too many of the highest-level tokens (like the refineries for the oil lobby) on the board at the same time,
          constituents get the word out and can as much as double every few moves. If you are&#39;t careful, they will take over the whole board and lose you the game.</p>
      </div>
    )
  }
})

export default ConstituentsHelp