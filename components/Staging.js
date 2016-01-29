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
				{toStage}
			</div>,
			{ style: {
					color: Utils.handleColors(tokenGroup, 'color'),
					backgroundColor: Utils.handleColors(tokenGroup, 'bColor'),
					margin: '15px',
					padding: '5px',
					border: '5px double #000',
					borderRadius: '100%',
					height: '150px',
					display: 'block',
					position: 'relative'
				}
			}
		);
	}
});

export default Staging
