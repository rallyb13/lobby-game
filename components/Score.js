import React from 'react';
import Utils from '../utils';

var Score = React.createClass({
  render: function(){
    return (
      <div>
        <h5 style={this.styles.score}> Score: {Utils.formatNum(this.props.score)} </h5>
      </div>
    );
  },

  styles: {
    score: {
      paddingLeft: '10px'
    }
  }
});

export default Score
