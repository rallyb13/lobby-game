import React from 'react';

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
      <div style={styles.mainGrid} ></div>
    );
  }

}

export default Grid
