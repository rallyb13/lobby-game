import React from 'react';
import GridSquare from './GridSquare';

var Grid = React.createClass({
  render: function(){
     var squares = [];
          var num = 36;
          for (var i=0; i < num; i++) {
              squares.push(<GridSquare />);
          }

    return (
      <div style={this.styles.mainGrid} >
        { squares }
      </div>
    );
  },

  styles: {
      mainGrid: {
          backgroundColor: "limegreen",
          height: "900px",
          width: "900px"
      }
  }

});

export default Grid
