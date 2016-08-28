import React from 'react'
import QuidStore from '../../store'
import Utils from '../../utils'

var HighScores = React.createClass({
  render() {
    let highs = this.createListItems();
        
    return(
      <div>
        <ol>High Scores
          {highs}
        </ol>
      </div>
    )
  },
  
  createListItems: function() {
    let highs = QuidStore.calculateHighs(false)
    let scores = highs['sortedScores']
    let offices = highs['sortedOffices']
    let listItems = []
    
    for (let j = 0; j < scores.length; j++){
      listItems.push(<li key={j}> {offices[j]} : {Utils.formatNum(scores[j])} </li>)
    }
    return listItems
  }

});

export default HighScores