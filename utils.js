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
    };
    return tokenMap[token];
  },

  scoreToken: function(token){
    var tokenValueMap = {
      'a': 5,
      'b': 10,
      'c': 25
    };
    return tokenValueMap[token];
  },

  earnFromToken: function(token){
    var tokenPayoutMap = {
      'a': 100,
      'b': 200,
      'c': 300
    }
    return tokenPayoutMap[token];
  },

  //TODO: add idea of mutliplier at certain phases of gameplay, earning bonus for reason
  scoreMatch: function(count, token){
    var bigMatchFactor = 1,
      matchValueMap = {
        'a': 20,
        'b': 45,
        'c': 95
      };
    if (count === 3){
      bigMatchFactor = 1.1;
    } else if (count > 3){
      bigMatchFactor = (count-1)*1.142
    }
    return Math.round(bigMatchFactor * matchValueMap[token]);
  },

  earnFromMatch: function(count, token){
    var bigMatchFactor = 1,
      matchPayoutMap = {
        'a': 250,
        'b': 500,
        'c': 1000
      }
    if (count === 3){
      bigMatchFactor = 1.1;
    } else if (count > 3 && count < 7){
      bigMatchFactor = 1.2;
    } else if (count >= 7){
      bigMatchFactor = 1.3
    }
    return Math.round(bigMatchFactor * matchPayoutMap[token]);
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
  },

  formatNum: function(num){
    var numString = num.toString(),
      charCount = numString.length,
      leftSideCount = charCount % 3,
      segmentCount = segmentCount = charCount/3,
      formatted = '',
      i;

    if (charCount > 3){
      if (leftSideCount !== 0){
        formatted = numString.slice(0, leftSideCount) + ',';
        numString = numString.slice(leftSideCount - charCount);
        charCount = charCount - leftSideCount;
        segmentCount = charCount/3;
      }
      for (i = 0; i < segmentCount; i++){
        formatted = formatted + numString.slice(i*3, (i+1)*3);
        if (i+1 < segmentCount){
          formatted = formatted + ',';
        }
      }
      return formatted;
    } else {
      return numString;
    }
  }

};

export default Utils;
