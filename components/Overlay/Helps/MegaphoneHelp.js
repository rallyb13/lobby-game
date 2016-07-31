import React from 'react'

var MegaphoneHelp = React.createClass({
  render(){
    return(
      <div>
        <p>Tokens represent specific legislative help you can give your lobbyists, but there are other ways to help. Speaking up on their behalf and taking their positions publically is a popular many politicians show support for their sponsors.</p>
        <p>The megaphone serves as a wild card. It can only be played where two matching tokens are already together. Play it as if it&#39;s your third token of any type.</p>
        <p>If there are more than one possible matches in a single space, it will make the best possible match, the one that will get you the most money.</p>
        <p>If there are more than one match which would happen in series (a single space connects both oil drops and oil cans), it will work as if you had placed the lowest token in the series, allowing you to make the double-match (in this example, for the derrick by playing the oil drop).</p>
      </div>
    )
  }
})

export default MegaphoneHelp