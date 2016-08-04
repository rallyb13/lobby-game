import React from 'react'

var Funds = React.createClass({
  render(){
    var bal = this.props.balance,
        goal = this.props.goal,
        diff = bal - goal,
        lastNumEl;
    
    if (diff < 0){
      lastNumEl = <li style={{color: 'red'}}>{diff}</li>
    } else {
      lastNumEl = <li>{diff}</li>
    }
    
    return(
      <div className='funds'>
        <h3>Fundraising:</h3>
        <ul className='calculation'>
          <li>{bal}</li>
          <li className='midNum'>- {goal}</li>
          {lastNumEl}
        </ul>
      </div>
    )
  }
})

export default Funds