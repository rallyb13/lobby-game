import React from 'react'

var FinancialLobbyHelp = React.createClass({
  render(){
    return (
      <div>
        <p>The Financial Lobby is, naturally, the biggest lobby in politics. They make money every which way, even with debt. Start with <b>credit cards</b> combining to a <b>mortgage</b>.</p>
        <div className="inline-help-images">
          <img src="assets/icons/icon-credit-cards.png" />
          <img src="assets/icons/icon-mortgage.png" />
        </div>
        <p>Next, the real money is locked away in <b>vaults</b> and <b>banks</b> before being traded around by professional gamblers up in the <b>financial towers</b> of wall street and Too Big to Fail mega-corporations.</p> 
        <div className="inline-help-images">
          <img src="assets/icons/icon-vault.png" />
          <img src="assets/icons/icon-bank.png" />
          <img src="assets/icons/icon-big-bank.png" />
        </div>
        <p>You know exactly what kind of favor the Financial Lobby will fork over: MONEY. Just remember those boys like to play games with it. The more of their tokens you have on the board (and the higher value those tokens are), the better the cash injection into your campaign can get.</p>
      </div>
    )
  }
})

export default FinancialLobbyHelp