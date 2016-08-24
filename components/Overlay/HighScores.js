import React from 'react'
import Store from '../../store'
import Utils from '../../utils'

var HighScores = React.createClass({
  render() {
    let highs = this.calculateHighs();
        
    return(
      <div>
        <ol>High Scores
          {highs}
        </ol>
      </div>
    )
  },
  
  //calculates the high scores, including current score
  //TODO: move to QuidStore so that end of game can call this, too!
  calculateHighs: function() {
    let bestScores = this.props.info.highScores
    let bestOffices = this.props.info.highOffices
    let offices = ['President', 'US Senator (Senior)', 'US Senator (Junior)', 'US Representative', 'State Senator', 'State Delegate']
    let toSortScores = []
    let sortedScores = []
    let sortedOffices = []
    let checkOffice = ''
    let listItems = []
        
    while (sortedScores.length <= 5 && offices.length !== 0) {
      checkOffice = offices.shift(0)
      if (this.props.currentOffice === checkOffice){
        sortedOffices.push(this.props.currentOffice)
        toSortScores.push(this.props.currentScore)
      }
      for (let i = 0; i < bestOffices.length; i++) {
        if (bestOffices[i] === checkOffice && sortedOffices.length <= 5){
          sortedOffices.push(checkOffice)
          toSortScores.push(bestScores[i])
        }
      }
      if (toSortScores.length !== 0) {
        toSortScores.sort(this.sortNumbers)
        sortedScores = sortedScores.concat(toSortScores)
        toSortScores = []
      }
    }
    
    for (let j = 0; j < sortedScores.length; j++){
      listItems.push(<li key={j}> {sortedOffices[j]} : {Utils.formatNum(sortedScores[j])} </li>)
    }
    return listItems
  },
  
  sortNumbers: function(a, b){
    return b - a
  }
});

export default HighScores