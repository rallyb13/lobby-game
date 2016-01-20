//Many elements of game play involve built-in changes, triggered at certain points.
//All of the internal progression lists can be accessed here.

var Utils = {

  promoteToken: function(token){
    var tokenMap = {
      'oil1': 'oil2', 'oil2': 'oil3', 'oil3': 'oil4', 'oil4': 'oil5', 'oil5': 'final',
      'agr1': 'agr2', 'agr2': 'agr3', 'agr3': 'agr4', 'agr4': 'agr5', 'agr5': 'final',
      'mil1': 'mil2', 'mil2': 'mil3', 'mil3': 'mil4', 'mil4': 'mil5', 'mil5': 'final',
      'fin1': 'fin2', 'fin2': 'fin3', 'fin3': 'fin4', 'fin4': 'fin5', 'fin5': 'final',

      'con': 'final'
    };
    return tokenMap[token];
  },

  scoreToken: function(token){
    var tokenValueMap = {
      'oil1': 5, 'oil2': 10, 'oil3': 25, 'oil4': 50, 'oil5': 100,
      'agr1': 50, 'agr2': 100, 'agr3': 150, 'agr4': 200, 'agr5': 250,
      'mil1': 200, 'mil2': 300, 'mil3': 400, 'mil4': 500, 'mil5': 750,
      'fin1': 250, 'fin2': 500, 'fin3': 1000, 'fin4': 1500, 'fin5': 2000,
      'con': 0
    };
    return tokenValueMap[token];
  },

  //token here is what there are 3 of--not what they're combined into
  earnFromToken: function(token){
    var tokenPayoutMap = {
      'oil1': 100, 'oil2': 200, 'oil3': 300, 'oil4': 400, 'oil5': 500,
      // 'agr1': 100, 'agr2': 200, 'agr3': 300, 'agr4': 400, 'agr5': 500,
      // 'mil1': 100, 'mil2': 200, 'mil3': 300, 'mil4': 400, 'mil5': 500,
      // 'fin1': 100, 'fin2': 200, 'fin3': 300, 'fin4': 400, 'fin5': 500,
      'con': 0
    }
    return tokenPayoutMap[token];
  },

  //token here is what there are 3 of--not what they're combined into
  scoreMatch: function(count, token){
    var bigMatchFactor = 1,
      matchValueMap = {
        'oil1': 20, 'oil2': 45, 'oil3': 95, 'oil4': 195, 'oil5': 0,
        // 'agr1': 20, 'agr2': 45, 'agr3': 95, 'agr4': 195, 'agr5': 0,
        // 'mil1': 20, 'mil2': 45, 'mil3': 95, 'mil4': 195, 'mil5': 0,
        // 'fin1': 20, 'fin2': 45, 'fin3': 95, 'fin4': 195, 'fin5': 0,
        'con': 0
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
        'oil1': 250, 'oil2': 500, 'oil3': 1000, 'oil4': 2500, 'oil5': 0,
        // 'agr1': 20, 'agr2': 45, 'agr3': 95, 'agr4': 195, 'agr5': 0,
        // 'mil1': 20, 'mil2': 45, 'mil3': 95, 'mil4': 195, 'mil5': 0,
        // 'fin1': 20, 'fin2': 45, 'fin3': 95, 'fin4': 195, 'fin5': 0,
        'con': 0
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
