//Many elements of game play involve built-in changes,
//triggered at certain points. All of the internal progression lists
//(including how the tokens relate to one another) can be accessed here.

var Utils = {

  promoteToken: function(token){
    var tokenMap = {
      'a': 'b',
      'b': 'c',
      'c': 'd',
      'd': 'e',
      'e': 'final'
    };
    return tokenMap[token];
  },

  scoreToken: function(token){
    var tokenValueMap = {
      'a': 5,
      'b': 10,
      'c': 25,
      'd': 50,
      'e': 100
    };
    return tokenValueMap[token];
  },

  earnFromToken: function(token){
    var tokenPayoutMap = {
      'a': 100,
      'b': 200,
      'c': 300,
      'd': 400,
      'e': 500
    }
    return tokenPayoutMap[token];
  },

  //TODO: add idea of mutliplier at certain phases of gameplay, earning bonus for reason
  scoreMatch: function(count, token){
    var bigMatchFactor = 1,
      matchValueMap = {
        'a': 20,
        'b': 45,
        'c': 95,
        'd': 195,
        'e': 500
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
        'c': 1000,
        'd': 2500,
        'e': 5000
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

  resetMovesCounter: function(phase){
    var MovesCountMap = {
      1: 730,
      2: 610,
      3: 120
    }
    return MovesCountMap[phase];
  },

  setNextGoal: function(phase) {
    var goalMap = {
      1: 125000,
      2: 75000,
      3: 100000
    };
    return goalMap[phase];
  },

  changeMessage: function(currentState) {
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

  setElectedOffice: function(phase, currentOffice) {
    console.log(currentOffice);
    var electedOfficeMap = {
          1: 'State Delegate',
          5: 'State Senator',
          9: 'Congressperson',
          15: 'Junior Senator',
          21: 'Senior Senator'
        };
    if (typeof electedOfficeMap[phase] === 'undefined'){
      return currentOffice;
    } else {
      console.log('It would be weird to see this console message.');
      return electedOfficeMap[phase];
    }
  },

  handleBoardChange: function(electedOffice) {
    var dimensions = [],
      boardMap = {
        'State Delegate': {rows: 6, columns: 6},
        'State Senator': {rows: 6, columns: 7},
        'Congressperson': {rows: 7, columns: 7},
        'Junior Senator': {rows: 7, columns: 8},
        'Senior Senator': {rows: 8, columns: 8}
      };
    dimensions.push(boardMap[electedOffice].rows);
    dimensions.push(boardMap[electedOffice].columns);
    return dimensions;
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
