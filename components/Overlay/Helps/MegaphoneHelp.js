import React from 'react'

var MegaphoneHelp = React.createClass({
  render(){
    return(
      <div>
        <p>Tokens represent specific legislative help you can give your lobbyists, but there are other ways to help. Speaking up on their behalf and taking their positions publically is a popular many politicians show support for their sponsors.</p>
        <p>The <b>megaphone</b> serves as a wild card. It can only be played where two matching tokens are already together. Play it as if it&#39;s your third token of any type.</p>
        <img src="assets/icons/icon-megaphone.png" />
        <p>If more than one possible matches can be made in a single space, the <b>megaphone</b> will make the best possible match, the one that will get you the most money.</p>
        <img src="assets/help-images/mega3.gif" />
        <p>If matches could happen in series (a single space connects both oil drops and oil cans), the <b>megaphone</b> will work as if you had placed the lowest token in the series, allowing you to make the double-match (in this example, for the derrick by playing the oil drop).</p>
        <img src="assets/help-images/mega1.gif" />
        <p>When you begin to deal with mulitple lobbies, be careful. The lobbies that pay more always get preference, so even the most basic agribusiness match is a preferred over any possible oil lobby match!</p>
        <img src="assets/help-images/mega2.gif" />
      </div>
    )
  }
})

export default MegaphoneHelp