//Many elements of game play involve built-in changes, triggered at certain points.
//All of the internal progression lists can be accessed here.

var Utils = {

  getTokenData: function(token, attribute){
    var tokenMap = {
      'oil1': {nextUp: 'oil2', pts: 5, mPts: 20, val: 100, mVal: 250, priority: 16 },
      'oil2': {nextUp: 'oil3', pts: 10, mPts: 45, val: 200, mVal: 500, priority: 15 },
      'oil3': {nextUp: 'oil4', pts: 25, mPts: 95, val: 300, mVal: 1000, priority: 14 },
      'oil4': {nextUp: 'oil5', pts: 50, mPts: 195, val: 400, mVal: 2500, priority: 13 },
      'oil5': {nextUp: 'final', pts: 100, mPts: 0, val: 500, mVal: 0 },

      'agr1': {nextUp: 'agr2', pts: 50, mPts: 205, val: 600, mVal: 2000, priority: 12 },
      'agr2': {nextUp: 'agr3', pts: 100, mPts: 500, val: 700, mVal: 2500, priority: 11 },
      'agr3': {nextUp: 'agr4', pts: 150, mPts: 750, val: 800, mVal: 3000, priority: 10 },
      'agr4': {nextUp: 'agr5', pts: 200, mPts: 1000, val: 900, mVal: 4321, priority: 9 },
      'agr5': {nextUp: 'final', pts: 250, mPts: 0, val: 1000, mVal: 0 },

      'mil1': {nextUp: 'mil2', pts: 200, mPts: 500, val: 1100, mVal: 4400, priority: 8 },
      'mil2': {nextUp: 'mil3', pts: 400, mPts: 1000, val: 1200, mVal: 4995, priority: 7 },
      'mil3': {nextUp: 'mil4', pts: 600, mPts: 1500, val: 1300, mVal: 5555, priority: 6 },
      'mil4': {nextUp: 'mil5', pts: 800, mPts: 2000, val: 1400, mVal: 7500, priority: 5 },
      'mil5': {nextUp: 'final', pts: 1000, mPts: 0, val: 1500, mVal: 0 },

      'fin1': {nextUp: 'fin2', pts: 1111, mPts: 2222, val: 1600, mVal: 7500, priority: 4 },
      'fin2': {nextUp: 'fin3', pts: 1333, mPts: 2995, val: 1700, mVal: 8500, priority: 3 },
      'fin3': {nextUp: 'fin4', pts: 1555, mPts: 3500, val: 1800, mVal: 9500, priority: 2 },
      'fin4': {nextUp: 'fin5', pts: 1777, mPts: 5000, val: 1900, mVal: 10001, priority: 1 },
      'fin5': {nextUp: 'final', pts: 1999, mPts: 0, val: 2000, mVal: 0 },

      'con': {nextUp: 'final', pts: 0, mPts: 0, val: 0, mVal: 0 },
      'mega': {nextUp: 'final', pts: 0, mPts: 0, val: 0, mVal: 0 },
    }
    return tokenMap[token][attribute];
  },

  handleColors: function(tokenGroup, attribute){
    var colorMap = {
      'oil': {color: 'gray', bColor: 'black', hover: 'black'},
      'agr': {color: 'green', bColor: 'yellow', hover: 'yellow'},
      'mil': {color: 'black', bColor: 'red', hover: 'red'},
      'fin': {color: 'yellow', bColor: 'green', hover: 'green'},
      '': {color: '#4B5043', bColor: '#A4BD99', hover: '#fff'},
      'con': {color: 'red', bColor: 'blue', hover: 'blue'},
      'por': {color: 'red', bColor: 'pink', hover: 'pink'},
    }
    return colorMap[tokenGroup][attribute];
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
