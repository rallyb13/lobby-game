import React from 'react';
import Token from './Token';
import Utils from '../utils'

var Staging = React.createClass({

	render: function(){
		var tokenGroup = this.props.stagedToken.slice(0,3),
			tokenDiv = <Token symbol={this.props.stagedToken}/>,
			gameOver = this.props.gameOver,
			toStage = gameOver ? <p></p> : tokenDiv;

		return React.cloneElement(
			<div>
			<div>
				<p>Your Next Piece: </p> </div>
				<div style={{width:'50%'}}> {toStage} </div>
			</div>,
			{ style: {
					backgroundColor: Utils.handleColors(tokenGroup, 'bColor'),
					padding: '0 5px 0 10px',
					border: '5px double #000',
					display: 'flex',
					flex: '0 0 auto',
					alignItems: 'center'
				}
			}
		);
	}
});

export default Staging
