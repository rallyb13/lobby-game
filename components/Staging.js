import React from 'react';
import Token from './Token'

var StagedToken = React.createClass({
	getInitialState: function(){
		return ({
			tokens: [a, a, b, c];   
		});
	},

	componentWillMount: function(){
		this.props.tokenSymbol = this.getSymbol();
	},

	render: function(){
		return (
			<div><Token symbol={this.props.tokenSymbol}></div>
		);
	},

	getSymbol: function(){
		var tokens = this.state.tokens;
		return tokens[Math.floor(Math.random() * tokens.length)];
	}
});

export default Staging