//Many elements of game play involve built-in changes, triggered at certain points.
//All of the internal progression lists can be accessed here.

var Utils = {

  getTokenData: function(token, attribute){
    var tokenMap = {
      'oil1': {nextUp: 'oil2', pts: 5, mPts: 20, val: 100, mVal: 250, priority: 19 },
      'oil2': {nextUp: 'oil3', pts: 10, mPts: 45, val: 200, mVal: 500, priority: 18 },
      'oil3': {nextUp: 'oil4', pts: 25, mPts: 95, val: 300, mVal: 1000, priority: 17 },
      'oil4': {nextUp: 'oil5', pts: 50, mPts: 195, val: 400, mVal: 2500, priority: 16 },
      'oil5': {nextUp: 'final', pts: 100, mPts: 100, val: 500, mVal: 500 },

      'agr1': {nextUp: 'agr2', pts: 50, mPts: 205, val: 600, mVal: 2000, priority: 14 },
      'agr2': {nextUp: 'agr3', pts: 100, mPts: 500, val: 700, mVal: 2500, priority: 13 },
      'agr3': {nextUp: 'agr4', pts: 150, mPts: 750, val: 800, mVal: 3000, priority: 12 },
      'agr4': {nextUp: 'agr5', pts: 200, mPts: 1000, val: 900, mVal: 4321, priority: 11 },
      'agr5': {nextUp: 'final', pts: 250, mPts: 250, val: 1000, mVal: 1000 },

      'mil1': {nextUp: 'mil2', pts: 200, mPts: 500, val: 1100, mVal: 4400, priority: 9 },
      'mil2': {nextUp: 'mil3', pts: 400, mPts: 1000, val: 1200, mVal: 4995, priority: 8 },
      'mil3': {nextUp: 'mil4', pts: 600, mPts: 1500, val: 1300, mVal: 5555, priority: 7 },
      'mil4': {nextUp: 'mil5', pts: 800, mPts: 2000, val: 1400, mVal: 7500, priority: 6 },
      'mil5': {nextUp: 'final', pts: 1000, mPts: 1000, val: 1500, mVal: 1500 },

      'fin1': {nextUp: 'fin2', pts: 1111, mPts: 2222, val: 1600, mVal: 7500, priority: 4 },
      'fin2': {nextUp: 'fin3', pts: 1333, mPts: 2995, val: 1700, mVal: 8500, priority: 3 },
      'fin3': {nextUp: 'fin4', pts: 1555, mPts: 3500, val: 1800, mVal: 9500, priority: 2 },
      'fin4': {nextUp: 'fin5', pts: 1777, mPts: 5000, val: 1900, mVal: 10001, priority: 1 },
      'fin5': {nextUp: 'final', pts: 1999, mPts: 1999, val: 2000, mVal: 2000 },

      'con1': {nextUp: 'final', pts: 0, mPts: 0, val: 0, mVal: 0 },
      'con2': {nextUp: 'final', pts: 7, mPts: 7, val: -100, mVal: -100, dMin: 25, dMax: 40, nextDown: '' },
      'con3': {nextUp: 'final', pts: 8, mPts: 8, val: -1000, mVal: -1000, dMin: 25, dMax: 45, nextDown: 'con4' },
      'con4': {nextUp: 'final', pts: 0, mPts: 0, val: 0, mVal: 0, dMin: 25, dMax: 45, nextDown: '' },
      'con5': {nextUp: 'final', pts: 9, mPts: 9, val: -5000, mVal: -5000, dMin: 35, dMax: 55, nextDown: 'con6' },
      'con6': {nextUp: 'final', pts: 0, mPts: 0, val: 0, mVal: 0, dMin: 35, dMax: 60, nextDown: 'con7' },
      'con7': {nextUp: 'final', pts: 0, mPts: 0, val: 0, mVal: 0, dMin: 35, dMax: 70, nextDown: '' },
      'mega': {nextUp: 'final', pts: 0, mPts: 0, val: 0, mVal: 0 },
      'pork': {nextUp: 'final', pts: 666, mPts: 666, val: 666, mVal: 666 },
    }
    return tokenMap[token][attribute];
  },

  handleColors: function(tokenGroup, attribute, selected){
    var colorMap = {
      'oil': {color: 'gray', bColor: 'black'},
      'agr': {color: 'green', bColor: 'yellow'},
      'mil': {color: 'black', bColor: 'red'},
      'fin': {color: 'yellow', bColor: 'green'},
      '': {color: '#4B5043', bColor: '#A4BD99'},
      'meg': {color: '#4B5043', bColor: '#A4BD99'},
      'con': {color: 'red', bColor: 'blue'},
      'por': {color: 'red', bColor: 'pink'},
    }
    if (selected === true) {
      return 'magenta';
    } else {
      return colorMap[tokenGroup][attribute];
    }
  },

  getPhaseData: function(phase){
    var phaseMap = {
      1: { moves: 180, goal: 50000, end: "a lowly regional consultant for OilOnU, making a meager $75,000/yr.", msg: ""},
      2: { moves: 145, goal: 65000, end: "a mid-level special projects consultant for the oil lobby, making only $88,500/yr.",
        msg: "Nice work! But this time you'll face a primary challenger. Prove you can help Big Oil more than Ollie 'Oilcan' Derricks can." },
      3: { moves: 45, goal: 30000, end: "a consultant in OilOnU's state office. At $100,000/yr, you'll be fine, buddy.",
        msg: "You greased 'Oilcan' Derricks for the primary win! Now put the pedal to the petrol and nab the general election."},
      4: { moves: 145, goal: 80000, end: "a consultant. Pack your bags! You're moving to OilCanU's national headquarters. $110,000/yr",
        msg: "You've held your seat. Looks like Derricks is back for a tougher challenge, though. Has he got a bigger lobby in his pocket, or is he just glad to see you?"},
      5: { moves: 45, goal: 55000, end: "a consultant, whatever that is. You'll 'work' remote and net $120K/yr.",
        msg: "You won the nomination! Other party's actually putting up a challenge, but nothing you can't handle."},
      6: { moves: 180, goal: 125000, end: "a consultant, or in other words, you give an opinion once in a while. No, it's not a giveaway. I'm sure your opinion's probably worth $150K/yr.",
        msg: "You're in for another term as State Delegate ... incumbency looks good on you! You can stick around for as long as you like now."},
      7: { moves: 180, goal: 125000, end: "a national consultant with OilCanU. You don't even have to do anything but give an opinion. Which is worth $150,000.",
        msg: "Nothing wrong with using your high profile as a State Delegate to highlight your candidacy for State Senate."},
      8: { moves: 315, goal: 125000, end: "an OilCanU consultant, for $150,000. If you'd rather stay closer to home, CattleProd Corp offered you a spot in their regional office, but only for $95K/yr.",
        msg: "Congrats, State Senator. Give agribusiness a leg up, and they'll send a fatty paycheck to help you out."},
      9: { moves: 45, goal: 125000, end: "a lobbyist with Cornyland. You'll make $115K/yr easy, but that's not counting bonuses, or your expense account.",
        msg: "You made it through the primary, but WHOA, here comes a tough general election! You're gonna have to put the 'aggro' in Big Agro."},
      10: { moves: 315, goal: 125000, end: "a CattleProd Corporation consultant in their state office, making $175K/yr.",
        msg: "Re-elected to State Senate! Some small fries are lining up against you for the next primary--but you're the two-term incumbent."},
      11: { moves: 45, goal: 125000, end: "a CattleProd Corporation consultant, at $175K/yr, though OilCanU wants to offer you a spot, too. Maybe you could do even 'conult' for both?",
        msg: "Big Agro helped you slaughter your primary opponents. Now you just have to sweet-talk your way through the general."},
      12: { moves: 360, goal: 125000, end: "a chief executive of special projects for AgriVat Industries. First special project is a conference in the Bahamas, so better get flying. $205K/yr.",
        msg: "You get a high-fructose high-five! You're secure in your State Senate office. No challengers on the horizon. How sweet it is..."},
      13: { moves: 360, goal: 125000, end: "a consultant for the oil lobby, for $150K. AND a consulting job with CattleProd Corp, for $110/yr. Don't worry, neither job requires much attention.",
        msg: "I suppose it's easy to get comfortable here. Just keep your lobbyists happy, and they'll keep your war chest fat."},
      14: { moves: 130, goal: 125000, end: "a consultant. A couple jobs, actually: one with the oil lobby, another with agribusiness. Each pays $150K/yr, and you can do both. All you need to do is offer your opinion or advice once in a while.",
        msg: "Your race to become a US Rep begins with a primary showdown against incumbent Aimee 'Deadeye' Dixon. Do what you can in the State Senate for the gun lobby if you want to hit national office."},
      15: { moves: 50, goal: 125000, end: "a special executive. It's a position AgriVat just created. It'll pay $225K/yr, plus bonuses.",
        msg: "You shot down 'Deadeye' and won the primary! Now, with help from the defense industry, you can shock and awe the voters into giving you the seat."},
      16: { moves: 155, goal: 125000, end: "a consultant with OilCanU for $150K. AND a mid-level executive with AgriVat, for $160K/yr. They're both fine with you doing both, just show up at whichever office whenever you feel like.",
        msg: "Mission Accomplished, Representative! Uh-oh, but 'Deadeye' Dixon says she'll be back for her seat."},
      17: { moves: 75, goal: 125000, end: "a LockLoadMartyr consultant, for $250K/yr. Also, the oil lobby wants to consult with you every now and then, for $10,000/hr.",
        msg: "Congrats, you won the party nomination. You should have no trouble gunning down the other party in the general, thanks to your firearms lobby friends."},
      18: { moves: 155, goal: 125000, end: "an industry expert and professional consultant with the National Ricochet Association. You can make $225K/yr, plus $15,000 for each speaking gig.",
        msg: "You've been re-elected to the House, but here comes another primary, and it's a deadly one! Make sure you go in with plenty of firepower!"},
      19: { moves: 75, goal: 125000, end: "a professional consultant with the National Ricochet Association, $225K/yr. Also, they're planning a series of conventions. Can you prepare a speech? You'll get $16,000 each time you give it.",
        msg: "Odds are good that you'll splatter another challenger this election. No need to bring out the big guns. Though, hey, it's a free country."},
      20: { moves: 155, goal: 125000, end: "a national consultant for LockLoadMartyr for $275K/yr. Also, the National Ricochet Association wants to pay you $17,500 per speaking gig, so maybe it's time for a victory lap after all.",
        msg: "It'll be tough to unseat longtime Senator Rich Brigand this primary--he's got a lot of financial sector money behind him. Show the Big Banks you've got the Powerballs!"},
      21: { moves: 75, goal: 125000, end: "an Agrivat consultant, for $225K per year. Also a LockLoadMartyr consultant, for another $125K/yr.",
        msg: "Whew! Your big gamble of a primary challenge paid off, but winning the general will still be difficult. Cut some regulations to help the banking lobby grow, grow, grow!"},
      22: { moves: 155, goal: 125000, end: "a lobbyist for oil...and a lobbyist for agribusiness. Each pays $150K/yr. Also, the military/industrial lobby would like you to give some speeches, at $20K-a-pop.",
        msg: "With Peter Pandurin retiring, there's no incumbent, making this an unexpectedly easy primary. All you need to do is get interest from Big Banks. You'll give them a great ROI, that's for sure."},
      23: { moves: 75, goal: 125000, end: "a LockLoadMartyr executive, for $350K/yr (starting salary).",
        msg: "You won the primary, but this'll be your toughest general election yet! You'll need a ton of cash. Help the financial industry until you're Too Big To Fail!"},
      24: { moves: 615, goal: 125000, end: "a LockLoadMartyr executive, for $350K/yr (starting salary). And a confidential signing bonus...",
        msg: "Keep doing intimate favors for the Big Banks. They'll thank you in the morning."},
      25: { moves: 75, goal: 125000, end: "a lobbyist for the National Ricochet Association, and another as a lobbyist for LockLoadMartyr. Each pays $200K/yr. Neither requires you to go in to work much.",
        msg: "Nice job in the primary. You have to persevere though the general election. Scratch the Big Banks' backs and they'll scratch yours ... or just give you lots of money."},
      26: { moves: 690, goal: 125000, end: "a financial consultant, for $350K/yr. Also, the weapons manufacturing lobby wants you to consult for them, for $150K/yr. Yes, you can do both.",
        msg: "Well, looks like you don't even have a primary challenger this time! The party thinks you're just too important to lose. And the financial sector agrees!"},
      27: { moves: 615, goal: 125000, end: "an executive at Bank Of Insolvancy, for $400K/yr (starting salary), plus quarterly bonuses.",
        msg: "Another election in the (money) bag! Now on to the next one. You have a few primary challengers, but don't worry--they're as weak as a local bank."},
      28: { moves: 75, goal: 125000, end: "a FineGamble Financial consultant. You'll make half a mil per year (which doesn't include the quarterly bonuses).",
        msg: "You won the primary, but you've got a difficult general election ahead. Better build up Big Bank support!"},
      29: { moves: 690, goal: 125000, end: "an executive at Bank Of Insolvancy, for $400K/yr (starting salary), plus quarterly bonuses. Also, the oil and gun lobbies want to pay you $100K/yr each, for 'vital'/(occasional) consulting.",
        msg: "Kudos on your re-election. Now you don't even have a challenger in the next primary! Guess you can take this one to the bank (oh ho ho)."},
      30: { moves: 615, goal: 125000, end: "a FineGamble Financial consultant. You'll make half a mil per year (which doesn't include the quarterly bonuses). Lobbying firms in three other industries will also pay you occasional (6-figure) special consulting fees.",
        msg: "Well, Senator, looks like you've got a challenger in the pirmary. But she's actually refused to take any money from lobbyists! This shouldn't be a tough win."},
      31: { moves: 75, goal: 125000, end: "a FineGamble Financial executive, for $750K/yr (starting salary), plus bonuses. An easy enough job that will leave you time to collect 6-figure consulting fees from other lobbying friends, er, firms.",
        msg: "Your old friend Rob M. Blynde is back again to challenge you for the seat. He's got serious support from Big Pharma and Tobacco, so I guess we'll find out who has the better friends."},
      32: { moves: 690, goal: 125000, end: "a consultant with FineGamble Financial, for half a mil every year (starting salary), plus bonuses. Also a consult with LockLoadMartyr for another quarter mil. You can still do special consulting with other firms, for a $100K fee each.",
        msg: "Gulp! You're in for the fight of your life. Your opponent, a serious 'reform candidate,' has a ton of popular support and is calling you out. Time to prove to America that, in the end, special interests always win!"},
      33: { moves: 1, goal: 0, end: "Good game, Mr. President.", msg: "YOU WIN! In fact, you've been such a friend to so many lobbyists, that a group of them got together and decided to install you as President of the United States of America. Feel free to keep playing the game, Mr. President, but you've already won it all!"}
    }
    return phaseMap[phase];
  },

  progressGame: function(phase, moves) {
    var data,
      progressionMap = {
          1: {
            160: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'con1'],
              msg: "Keep this up, and the oil lobby will keep your coffers stuffed. Though you may annoy some constituents...",
              nextTrigger: 140
            },
            140: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil3', 'con1', 'mega'],
              msg: "Passing helpful legislation isn't the only way to help out your friendly lobbyists. Use your position of authority to give them a voice. The megaphone can be quite a wild card.",
              nextTrigger: 115
            },
            115: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil2', 'con1'],
              msg: "Oil drops fill oil barrels... Legislate away restrictions on where we can drill! Refineries mean jobs. And those pipelines mean...plenty of profit to go around!",
              nextTrigger: 82
            },
            82: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil3', 'con1', 'con1', 'mega'],
              msg: "Maybe you should build these constituents a park. It'll cost you money to publicize (and to, ah, speed up the process), but it might placate some of them awhile.",
              nextTrigger: 44
            },
            44: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil2', 'oil3', 'oil4', 'con1', 'con1', 'mega'],
              msg: "Don't let those constituents get in the way of what you need to do for the people who pay your way! Come election time, money buys ads, and ads suppress turnout. And our party always wins this district (we carved it that way).",
              nextTrigger: 115
            }
          },
          2: {
            115: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil3', 'con1', 'con1', 'con1', 'mega'],
              msg: "You know what gerrymandering really means? It means we're gonna need to spend more on the primary than the general!",
              nextTrigger: 72
            },
            72: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil3', 'oil4', 'con1', 'con1', 'con1', 'mega'],
              msg: "Don't worry about election laws that say money raised is earmarked as for this election or that one. This is what super-PACs are for. Rolling money on through election cycles is just one of many ways we winners buck the system.",
              nextTrigger: 33
            }
          },
          3: {
            33: {
              tokens: ['oil1', 'oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'oil2', 'oil2', 'oil3', 'oil4', 'con1', 'con1', 'mega'],
              msg: "Once you do enough back-scratching, you can just pick up the phone and call in a favor. Those power-ups are really helpful when it's down to the wire.",
              nextTrigger: 461 //TODO: this will change!
            }
          },
          27: {
            461: {
              tokens: ['oil1', 'agr1', 'fin1', 'fin1', 'mil1', 'mil1', 'mega', 'mega', 'con1'],
              msg: "Budget Crisis! During this special session, you'll only have low level tokens to work with. Use the extra time in Washington to make more speeches (megaphones) than usual.",
              nextTrigger: 459,
              moveChange: 40
            },
            459: {
              tokens: ['oil1', 'agr1', 'mil1', 'mil2', 'mil2', 'fin1', 'fin2', 'fin2', 'fin3', 'mega', 'pork', 'con1', 'con1'],
              msg: "The special session's over and the budget crisis has been patched up, for now. With the holidays over and the next session starting, things will slowly be getting back to normal...",
              nextTrigger: 155 //TODO: this will change!
            }
          },
          30: {
            155: {
              tokens: ['oil1', 'oil2', 'agr1', 'agr2', 'mil1', 'mil2', 'mil2', 'mil3', 'fin1', 'fin1', 'fin2', 'fin2', 'fin3', 'fin3', 'fin4', 'con1', 'con1', 'con1', 'mega', 'mega', 'pork', 'pork'],
              msg: "Government shutdown knocked some days off the legislative calendar! Better make up for it, espeically when the big banks are counting on you!",
              nextTrigger: 777, //TODO: this will change!
              moveChange: -23
            }
          }
        };
    data = progressionMap[phase][moves];
    if (typeof data === 'undefined'){
      return false;
    } else {
      return data;
    }
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

  setElectionChoice: function(phase, repeat) {
    var advMsgMap = {
      5: "Want to run for State Senate? With no real competition to face in the primary, this could be your moment to climb...",
      6: 'NOW would you like to run for State Senate? ',
      12: "You're destined for great things. The US House of Representatives is calling your name. Will you run?",
      13: 'Want to go to DC now? The US Congress awaits...',
      19: {
        0: "Want to challenge X for that Senate seat?",
        1: "Want to challenge Y for his Senate seat?",
        2: "none"
      }
    };
    if (typeof advMsgMap[phase] === 'undefined'){
      return 'none';
    } else {
      return advMsgMap[phase];
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
