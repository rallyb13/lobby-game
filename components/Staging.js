import React from 'react';
import Token from './Token';

var Staging = React.createClass({

	render: function(){
		return (
			<div style={this.styles.stagingArea}>
				<Token symbol={this.props.stagedToken}/>
			</div>
		);
	},

	styles: {
		stagingArea: {
			color: 'white',
			margin: '15px',
			padding: '5px',
			backgroundColor: '#043cb3',
			border: '5px double #02246c',
			borderRadius: '100%',
			height: '150px',
			display: 'block',
			position: 'relative'
		}
	}
});

export default Staging
