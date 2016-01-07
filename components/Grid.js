import React from 'react';
import GridSquare from './GridSquare';

class Grid extends React.Component{
  render(){
    var styles = {
        mainGrid: {
            backgroundColor: "green",
            height: "300px",
            width: "300px"
        }
    }

    return (
      <div style={styles.mainGrid} >
        <GridSquare />
      </div>
    );
  }

}

export default Grid
