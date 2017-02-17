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
  
  // TODO: refactor to pull from userInfo
  createListItems: function() {
    let scores = this.props.scores
    let offices = this.props.offices
    let listItems = []
    
    for (let j = 0; j < scores.length; j++){
      listItems.push(<li key={j}> {offices[j]} : {Utils.formatNum(scores[j])} </li>)
    }
    return listItems
  }

});

export default HighScores