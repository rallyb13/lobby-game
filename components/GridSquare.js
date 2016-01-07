import React from 'react';

class GridSquare extends React.Component{
  render(){
    var styles = {
       gridSquare: {
        border: '1px solid #000',
        height: '16.6%',
        width: '16.6%'
       }
    }

    return (
      <div style={styles.gridSquare} ></div>
    );
  }

}

export default GridSquare
