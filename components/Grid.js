import React from 'react';
import GridSquare from './GridSquare';

class Grid extends React.Component{
  render(){
    var styles = {
        mainGrid: {
            backgroundColor: "limegreen",
            height: "900px",
            width: "900px"
        }
    };

    return (
      <div style={styles.mainGrid} >
          <GridSquare />
          <GridSquare />
          <GridSquare />
          <GridSquare />
          <GridSquare />
          <GridSquare />
          <GridSquare />
      </div>
    );
  }

}

export default Grid
