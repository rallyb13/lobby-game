import React from 'react';

class GridSquare extends React.Component{
  render(){
    var styles = {
       gridSquare: {
        border: '1px solid #000',
        height: '16.4%',
        width: '16.4%',
        color: 'white',
        margin: 0,
        display: 'inline-block'
       }
    }

    return (
      <div style={styles.gridSquare} >Look at me! Eep Eep Eeep Eeeeep</div>
    );
  }

}

export default GridSquare
