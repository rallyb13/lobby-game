import React from 'react';
import Token from './Token';

var Staging = React.createClass({
	getInitialState: function(){
		return ({
			tokens: ['a', 'a', 'b', 'c']   
		});
	},

	render: function(){
		return (
			<div><Token symbol={this.getSymbol()}/></div>
		);
	},

	getSymbol: function(){
		var tokens = this.state.tokens;
		return tokens[Math.floor(Math.random() * tokens.length)];
	}
});

export default Staging