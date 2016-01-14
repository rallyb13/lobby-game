//Many elements of game play involve built-in changes,
//triggered at certain points. All of the internal progression lists
//(including how the tokens relate to one another) can be accessed here.

var Utils = {

//TODO: tokensArray, board rows/columns, & movesRemaining also change with phase
//TODO: phase change MAY simply be a map with each new phase offering a list of callbacks!

  promoteToken: function(token){
    var tokenMap = {
      'a': 'b',
      'b': 'c',
      'c': 'final'
    }
    return tokenMap[token];
  },

  setNextGoal: function(currentState) {
    var goalMap = {
          1: 125000,
          2: 75000,
          3: 100000
        };
    return goalMap[currentState.gamePhase];
  },

  setMessage: function(currentState) {
    var gamePhase = currentState.gamePhase,
        nextGoal = currentState.nextGoal,
        movesRemaining = currentState.movesRemaining,
        messageMap = {
          1: 'Congrats on your election. Now raise some money.'
          // 1: 'You need to raise $' + {nextGoal} + ' in ' + {movesRemaining} 'days in order to win re-election!',
          // 2: 'Primary challenger! You need $' + nextGoal + ' in only ' + movesRemaining + ' days.',
          // 3: 'You survived your primary. Hope you can still raise $' + nextGoal + ' in the ' + movesRemaining + 'days.'
        };
    return messageMap[gamePhase];
  },

  setElectedOffice: function(currentState) {
    var electedOfficeMap = {
          1: 'State Delegate',
          2: 'State Delegate',
          3: 'State Delegate'
        };
    return electedOfficeMap[currentState.gamePhase];
  }

};

export default Utils;
