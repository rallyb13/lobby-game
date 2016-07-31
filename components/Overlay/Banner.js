import React from 'react'

var Banner = React.createClass({
  render(){
    var headline = this.getHeadline();

    return(
        <h1 className="modalBanner">{headline}</h1>
    )
  },

  getHeadline(){
    var isGameOver = this.props.isGameOver;

    if (this.props.moves === 0 || isGameOver) {
      if (isGameOver === 'board'){
        return 'Talk about gridlock! Game Over.';
      } else if (isGameOver === 'bank'){
        return 'Game Over: Votes can be bought, just not by you.';
      } else {
        return 'Congratulations, ' + this.props.office + '!';
      }
    } else {
      return 'Current Election Report';
    }

  }
})

export default Banner
