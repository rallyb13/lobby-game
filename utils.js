//Many elements of game play involve built-in changes, triggered at certain points.
//All of the internal progression lists can be accessed here.

var Utils = {

  getTokenData: function(token, attribute){
    var tokenMap = {
      'oil1': {nextUp: 'oil2', pts: 5, mPts: 20, val: 100, mVal: 250, priority: 19 },
      'oil2': {nextUp: 'oil3', pts: 10, mPts: 45, val: 200, mVal: 500, priority: 18 },
      'oil3': {nextUp: 'oil4', pts: 25, mPts: 95, val: 300, mVal: 1000, priority: 17 },
      'oil4': {nextUp: 'oil5', pts: 50, mPts: 195, val: 400, mVal: 2500, priority: 16 },
      'oil5': {nextUp: 'final', pts: 100, mPts: 0, val: 500, mVal: 0 },

      'agr1': {nextUp: 'agr2', pts: 50, mPts: 205, val: 600, mVal: 2000, priority: 14 },
      'agr2': {nextUp: 'agr3', pts: 100, mPts: 500, val: 700, mVal: 2500, priority: 13 },
      'agr3': {nextUp: 'agr4', pts: 150, mPts: 750, val: 800, mVal: 3000, priority: 12 },
      'agr4': {nextUp: 'agr5', pts: 200, mPts: 1000, val: 900, mVal: 4321, priority: 11 },
      'agr5': {nextUp: 'final', pts: 250, mPts: 0, val: 1000, mVal: 0 },

      'mil1': {nextUp: 'mil2', pts: 200, mPts: 500, val: 1100, mVal: 4400, priority: 9 },
      'mil2': {nextUp: 'mil3', pts: 400, mPts: 1000, val: 1200, mVal: 4995, priority: 8 },
      'mil3': {nextUp: 'mil4', pts: 600, mPts: 1500, val: 1300, mVal: 5555, priority: 7 },
      'mil4': {nextUp: 'mil5', pts: 800, mPts: 2000, val: 1400, mVal: 7500, priority: 6 },
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

  getPhaseData: function(phase){
    var phaseMap = {
      1: { moves: 180, goal: 125000, msg: ""},
      2: { moves: 145, goal: 105000, msg: "Congratulations on your win, but this time you'll face a primary challenge. And in this district, that's the tougher race!" },
      3: { moves: 45, goal: 35000, msg: "Whew! Pete Pandurin put up a tough challenge. He'll be back, but right now, you'd better focus on the general!"},
      4: { moves: 145, goal: 200000, msg: "You've held your seat, but Pete's back, and he really wants your seat. He's already started raising money for ad buys..."},
      5: { moves: 45, goal: 50000, msg: "You're our nominee! Other party's actually putting up a challenge, but nothing you can't handle."},
      6: { moves: 180, goal: 125000, msg: "Welcome to another term in the State House of Delegates. Incumbency has really set in, so you could probably stay here forever if you wanted to.", repeat: 0},
      7: { moves: 180, goal: 125000, msg: ''},
      8: { moves: 315, goal: 125000, msg: ''},
      9: { moves: 45, goal: 125000, msg: ''},
      10: { moves: 315, goal: 125000, msg: ''},
      11: { moves: 45, goal: 125000, msg: ''},
      12: { moves: 360, goal: 125000, msg: ''},
      13: { moves: 360, goal: 125000, msg: '', repeat: 0},
      14: { moves: 130, goal: 125000, msg: ''},
      15: { moves: 50, goal: 125000, msg: ''},
      16: { moves: 155, goal: 125000, msg: ''},
      17: { moves: 75, goal: 125000, msg: ''},
      18: { moves: 155, goal: 125000, msg: ''},
      19: { moves: 75, goal: 125000, msg: ''},
      20: { moves: 155, goal: 125000, msg: ''},
      21: { moves: 75, goal: 125000, msg: ''},
      22: { moves: 155, goal: 125000, msg: ''},
      23: { moves: 75, goal: 125000, msg: ''},
      24: { moves: 615, goal: 125000, msg: ''},
      25: { moves: 75, goal: 125000, msg: ''},
      26: { moves: 690, goal: 125000, msg: ''},
      27: { moves: 615, goal: 125000, msg: ''},
      28: { moves: 75, goal: 125000, msg: ''},
      29: { moves: 690, goal: 125000, msg: ''},
      30: { moves: 615, goal: 125000, msg: ''},
      31: { moves: 75, goal: 125000, msg: ''},
      32: { moves: 690, goal: 125000, msg: ''}
    }
    return phaseMap[phase];
  },

  //TODO: refactor for only for mid-phase messages
  progressGame: function(currentState, moves) {
    var gamePhase = currentState.gamePhase,
        movesRemaining = currentState.movesRemaining,
        progressionMap = {
          1: {
            160: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'con'],
              msg: "Keep this up, and the oil lobby will keep your coffers stuffed. Though you may annoy some constituents...",
              nextTrigger: 140
            },
            140: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil3', 'con', 'mega'],
              msg: "Passing helpful legislation isn't the only way to help out your friendly lobbyists. Use your position of authority to give them a voice. The megaphone can be quite a wild card.",
              nextTrigger: 115
            },
            115: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil2', 'con'],
              msg: "Oil drops fill oil barrels... Legislate away restrictions on where we can drill! Refineries mean jobs. And those pipelines mean...plenty of profit to go around!",
              nextTrigger: 82
            },
            82: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil3', 'con', 'con', 'mega'],
              msg: "Maybe you should build these constituents a park. It'll cost you money to publicize (and to, ah, speed up the process), but it might placate some of them awhile.",
              nextTrigger: 44
            },
            44: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil2', 'oil3', 'oil4', 'con', 'con', 'mega'],
              msg: "Don't let those constituents get in the way of what you need to do for the people who pay your way! Come election time, money buys ads, and ads suppress turnout. And our party always wins this district (we carved it that way).",
              nextTrigger: 115
            }
          },
          2: {
            115: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil3', 'con', 'con', 'con', 'mega'],
              msg: "Guy named Pete something-or-other is challenging you for the nomination. We're gonna need to spend more on the primary than the general!",
              nextTrigger: 72
            },
            72: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil3', 'oil4', 'con', 'con', 'con', 'mega'],
              msg: "Don't worry about election laws that say money raised is earmarked as for this election or that one. This is what super-PACs are for. Rolling money on through election cycles is just one of many ways we winners buck the system.",
              nextTrigger: 33
            }
          }
        };
    return progressionMap[currentState][moves];
  },

  setElectedOffice: function(phase, currentOffice) {
    var electedOfficeMap = {
          1: 'State Delegate',
          8: 'State Senator',
          16: 'US Representative',
          24: 'US Senator (Junior)',
          30: 'US Senator (Senior)'
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
