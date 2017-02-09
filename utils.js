//Many elements of game play involve built-in changes, triggered at certain points.
//All of the internal progression lists can be accessed here.

var Utils = {

  // handle CSS for stripped-down overlay for login cases
  setWelcome: function(){
    document.getElementById('welcomeScreen').style.display = 'block';
    document.getElementById('currentElection').style.display = 'none';
    document.getElementById('closeButton').style.display = 'none';
    document.getElementById('helpTabs').style.display = 'none';
  },

  //phase ref specifically for elected office changes
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

  //phase ref specifically for messages that appear with choice of advancing to next phase/office
  setElectionChoice: function(phase) {
    var advMsgMap = {
      5: "Want to run for State Senate? With no real competition to face in the primary, this could be your moment to climb...",
      6: 'NOW would you like to run for State Senate? ',
      12: "You're destined for great things. The US House of Representatives is calling your name. Will you run?",
      13: 'Want to go to DC now? The US Congress awaits...',
      19: {
        0: "Want to challenge Rich Brigand for his Senate seat? If you wait two years, you can challenge the opposing party's guy, though.",
        1: "The party will love you forever if you can knock Les Moore from his Senate seat. He does favors for his lobbies, too (most Senators do, in both parties), but he's never focused on it like you have.",
        2: "none"
      }
    };
    if (typeof advMsgMap[phase] === 'undefined'){
      return 'none';
    } else {
      return advMsgMap[phase];
    }
  },

  //reference for board dimensions relating to each office
  handleBoardChange: function(electedOffice) {
    var dimensions = [],
      boardMap = {
        'State Delegate': {rows: 6, columns: 6},
        'State Senator': {rows: 6, columns: 7},
        'US Representative': {rows: 7, columns: 7},
        'US Senator (Junior)': {rows: 7, columns: 8},
        'US Senator (Senior)': {rows: 8, columns: 8}
      };
    dimensions.push(boardMap[electedOffice].rows);
    dimensions.push(boardMap[electedOffice].columns);
    return dimensions;
  },

  //token category reference for color & background color (and special selected case)
  handleColors: function(tokenGroup, attribute, selected){
    var colorMap = {
      'oil': {bColor: '#818479'},
      'agr': {bColor: '#DAFF7D'},
      'mil': {bColor: '#DB5461'},
      'fin': {bColor: '#4CB944'},
      '': {bColor: '#D2E4C4'},
      'meg': {bColor: '#D2E4C4'},
      'con': {bColor: '#246EB9'},
      'por': {bColor: 'pink'},
    }
    if (selected === true) {
      return '#7D80DA';
    } else {
      return colorMap[tokenGroup][attribute];
    }
  },

  //token reference stores what each matches into, pts & bank earned on both setting and matching
  //priority is used to select among options when megaphone placed at point of multiple matches
  //appeasement tokens have data on cost, range of moves the token stays in place, and what token "decays" into
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
    if (typeof attribute !== 'undefined' && attribute !==null) {
      return tokenMap[token][attribute];
    } else {
      return tokenMap[token]
    }
  },

  //phase reference for how many moves, bank balance needed to continue, msg to open new phase, and msg used for game ending at that level
  getPhaseData: function(phase){
    var phaseMap = {
      1: { failMsg: "a lowly regional consultant for OilOnU, making a meager $75,000/yr.",
        winMsg: "Nice work! But this time you'll face a primary challenger. Prove you can help Big Oil more than Ollie 'Oilcan' Derricks can.",
        moves: 180, goal: 35000 },
      2: { playMsg: "Ollie 'Oilcan' Derricks has decided to challenge you in the primary. You can't help but feel sorry for the poor sleeze--he played slick with his district for years, but hey, census happens. Ollie's district (coincidentally one with the most earthquakes that no one has REALLY proved are caused by fracking) lost the most people, so he got redrawn, carved up. He's not known beyond his old district, nor even respected in it, but he does have some friends, so you better really pledge your allegiance to your lobby. Never let them doubt you can help them--because they know Ollie can.",
        failMsg: "a mid-level special projects consultant for the oil lobby, making only $88,500/yr.",
        winMsg: "You greased 'Oilcan' Derricks for the primary win! Now put the pedal to the petrol and nab the general election.",
        moves: 145, goal: 45000 },
      3: { playMsg: "I cannot believe this, but it's Bubs Oldentine! He's back to challenge you. Whew! After the fight Ollie put up, this old school fool ain't nothing. He doesn't even have a big lobby backing him up. Grease him! OH yeah, and don't worry about rolling the money over from one election into another. That would be illegal if it was all in YOUR campaign chest, but that's why we have superPACs. Just one more way winners buck the system.",
        failMsg: "a consultant in OilOnU's state office. At $100,000/yr, you'll be fine, buddy.",
        winMsg: "You've held your seat. Looks like Derricks is back for a tougher challenge, though. Has he got a bigger lobby in his pocket, or is he just glad to see you?",
        moves: 45, goal: 20000 },
      4: { playMsg: "Yes, indeed. Ollie 'Oilcan' Derricks has a new friend. The energy lobby isn't enough for him, so he's talking a good game to the agribusiness lobby. It's not a bad idea, actually. We'll look into that later. For now, let's figure they'll see he's all hat and no cattle. Even so, they've got crazy money to throw. They'll give him some cash just for making a move their way. He's gonna be tougher to beat this time.",
        failMsg: "a consultant. Pack your bags! You're moving to OilCanU's national headquarters. $110,000/yr",
        winMsg: "You won the nomination! Other party's actually putting up a new challenger, but nothing you can't handle.",
        moves: 145, goal: 50000 },
      5: { playMsg: "Well, lookee at that. The other party hasn't even bothered to mount a serious challenge. Some upstart city council kid named Johnny Q. Blick is coming at you. That's what they get for not building up their legislative bench and focusing only on the big elections. They've got nobody. Keep making money now, though, so you'll have more for the next election. It pays (BIG) to think ahead.",
        failMsg: "a consultant, whatever that is. You'll 'work' remote and net $120K/yr.",
        winMsg: "You're in for another term as State Delegate ... incumbency looks good on you! You can stick around for as long as you like now.  Especially since Ollie's looking into targeting a weaker district next time. The party likes you well enough that you shouldn't be challenged for this seat by your own any time soon.",
        moves: 45, goal: 20000 },
      6: { playMsg: "You're going another round with the city council kid, Blick. That little twerp has gotten some local community support and maybe a little union money, but he's still a small fry. Nobody will bet big on him for this little seat.",
        failMsg: "a consultant, or in other words, you give an opinion once in a while. No, it's not a giveaway. You've been close to the action. I'm sure your opinion's probably worth $150K/yr.",
        winMsg: "Nothing wrong with using your high profile as a State Delegate to highlight your candidacy for State Senate.",
        moves: 180, goal: 50000 },
      7: { playMsg: "Allow me to introduce you to George Sapp. For over twenty-seven years he's served his state in various roles, including four 4-year terms in the State Senate. Thanks to some opposition research, though, we know he's having an affair. The press is so obsessed with scandal, they'll forget everything he's ever done in their rush to high ratings. Because he's so beloved, your party hasn't bothered putting up a decent challenge. Looks like the perfect recipe to advance to a higher office--but he's still the incumbent, so you need to get your name out there, which costs big bucks.",
        failMsg: "a national consultant with OilCanU. You don't even have to do anything but give an opinion. Which is worth $150,000.",
        winMsg: "Congrats, State Senator. People may have mixed feelings about your win, but don't worry about them. In fact, there's a lobby I've been meeting with that's especially happy to see Sapp get the boot. Give agribusiness a leg up, and they'll send a fatty paycheck to help you out.",
        moves: 180, goal: 75000 },
      8: { playMsg: "Oh criminy. Remember Peter Pandurin? Of course you do. He may have voted with us in the House, but what a jerk. Well, rumor has it he's gonna challenge you for your seat now that you've won it for the party. What a tool.",
        failMsg: "an OilCanU consultant, for $150,000. If you'd rather stay closer to home, CattleProd Corp offered you a spot in their regional office, but only for $95K/yr.",
        winMsg: "You made it through the primary, but here comes a tough general election! You're gonna have to put the 'aggro' in Big Agro.",
        moves: 315, goal: 85000 },
      9: { playMsg: "Oh yeah, they've had a few years to prepare. The other party wants Sapp's old seat back. They're throwing some chick at you. Can't remember her name. Hell, I forget women are allowed to be politicians at all.",
        failMsg: "a lobbyist with Cornyland. You'll make $115K/yr easy, but that's not counting bonuses, or your expense account.",
        winMsg: "Re-elected to State Senate! Some small fries are lining up against you for the next primary--but you're the two-term incumbent.",
        moves: 45, goal: 25000 },
      10: { playMsg: "Doesn't look like Peter wants to risk coming at you again after the way you handled both him and what's her name. A bunch of little no-name wannabe party-players are lining up to try, but this one's not much to worry about.",
        failMsg: "a CattleProd Corporation consultant in their state office, making $175K/yr.",
        winMsg: "Big Agro helped you slaughter your primary opponents. Now you just have to sweet-talk your way through the general.",
        moves: 315, goal: 90000 },
      11: { playMsg: "So...you remember how that kid Blick ended up taking your seat in the House after you left? Well, he thinks he's going to follow your path up. Here he comes again. You've beaten him twice before. Let him and his labor pals know who rules the roost around here!",
        failMsg: "a CattleProd Corporation consultant, at $175K/yr, though OilCanU wants to offer you a spot, too. Maybe you could do even 'consult' for both?",
        winMsg: "You get a high-fructose high-five! You're secure in your State Senate office. No challengers on the horizon. How sweet it is...",
        moves: 45, goal: 30000 },
      12: { playMsg: "Yup, the party recognizes that this is YOUR seat now. Until you move on up, they'll see to it that not even Peter comes gunning for you. You only have to worry about Blick again. Stupid kid just won't quit.",
        failMsg: "a chief executive of special projects for AgriVat Industries. First special project is a conference in the Bahamas, so better get flying. $205K/yr.",
        winMsg: "I suppose it's easy to get comfortable here. Just keep your lobbyists happy, and they'll keep your war chest fat.",
        moves: 360, goal: 125000 },
      13: { playMsg: "Blick's given up on bumping you, I guess. That woman is back, though. You know, uh, whatsername?",
        failMsg: "a consultant for the oil lobby, for $150K. AND a consulting job with CattleProd Corp, for $110/yr. Don't worry, neither job requires much attention.",
        winMsg: "You beat that Blick again! He'll probably just keep coming back, you know.",
        moves: 360, goal: 125000 },
      14: { playMsg: "Your race to become a US Rep begins with a primary showdown against incumbent Aimee 'Deadeye' Dixon. Do what you can in the State Senate for the gun lobby if you want to hit national office. Thanks to gerrymandering, it's really only the primary that matters, so don't hold back.",
        failMsg: "a consultant. A couple jobs, actually: one with the oil lobby, another with agribusiness. Each pays $150K/yr, and you can do both. All you need to do is offer your opinion or advice once in a while.",
        winMsg: "You shot down 'Deadeye' and won the primary! Now, with help from the defense industry, you can shock and awe the voters into giving you the seat.",
        moves: 130, goal: 35000 },
      15: { playMsg: "Sure enough, the other team doesn't even expect to give you a significant challenge. The best they can do, for a national office, is former Mayor Charlie Hayleyus.",
        failMsg: "a special executive. It's a position AgriVat just created. It'll pay $225K/yr, plus bonuses.",
        winMsg: "Mission Accomplished, Representative! Uh-oh, but 'Deadeye' Dixon says she'll be back for her seat.",
        moves: 50, goal: 50000 },
      16: { playMsg: "It's gonna be a real showdown this time. Aimee 'Deadeye' Dixon is mounting a major offensive. She's long been a gun activist favorite as well as helping companies like LockLoadMartyr score lucrative government contracts (even when the Pentagon says it doesn't use the stuff they're building!) But if you show you're willing to work with the same crew, while not just hitting the one target, you may just end up the favorite.",
        failMsg: "a consultant with OilCanU for $150K. AND a mid-level executive with AgriVat, for $160K/yr. They're both fine with you doing both, just show up at whichever office whenever you feel like.",
        winMsg: "Congrats, you won the party nomination. You should have no trouble gunning down the other party in the general, thanks to your firearms lobby friends.",
        moves: 155, goal: 125000 },
      17: { playMsg: "Well, here's a surprise. Sorry I didn't prepare you for this, but Duncan 'Doc' McKenzie is an actual contender. He's got Big Pharma money, so he might actually pose a challenge. Not a big one. This district really should stay ours, but he probably thinks your weak after the fight with Deadeye.",
        failMsg: "a LockLoadMartyr consultant, for $250K/yr. Also, the oil lobby wants to consult with you every now and then, for $10,000/hr.",
        winMsg: "You've been re-elected to the House, but here comes another primary. You know the deal. Actually, Aimee's been told to cool her pistols by the party, so I wonder who might go against the grain to challenge you...",
        moves: 75, goal: 125000 },
      18: { playMsg: "Peter Pandurin! He does talk a good game with the voters, and he's drummed up some funding somehow.",
        failMsg: "an industry expert and professional consultant with the National Ricochet Association. You can make $225K/yr, plus $15,000 for each speaking gig.",
        winMsg: "Odds are good that you'll splatter another challenger this election. No need to bring out the big guns. Though, hey, it's a free country.",
        moves: 155, goal: 125000 },
      19: { playMsg: "You've got this seat pretty much locked at this point. Former Mayor Charlie Hayleyus is back, but that just shows the other party's given up. You can stay here as long as you like...",
        failMsg: "a professional consultant with the National Ricochet Association, $225K/yr. Also, they're planning a series of conventions. Can you prepare a speech? You'll get $16,000 each time you give it.",
        winMsg: "You've proven you're a real player, not only at winning elections on a national level, but at managing constituent annoyances while getting the real work done for the people who deserve to have their interests represented in Washington. Now may be the time to advance even higher... If you go for it, you'll need to get interest from Big Banks. You'll give them a great ROI, that's for sure.",
        moves: 75, goal: 125000 },
      20: { playMsg: "It'll be tough to unseat longtime Senator Rich Brigand this primary--he's got a lot of financial sector money behind him. Show the Big Banks you've got the Powerballs!",
        failMsg: "a national consultant for LockLoadMartyr for $275K/yr. Also, the National Ricochet Association wants to pay you $17,500 per speaking gig, so maybe it's time for a victory lap after all.",
        winMsg: "Whew! Your big gamble of a primary challenge paid off, but winning the general will still be difficult. Cut some regulations to help the banking lobby grow, grow, grow!",
        moves: 155, goal: 125000 },
      21: { playMsg: "The other party just sorta assumed they'd be dealing with Rich, and now they're scrambling for a new strategy. Spend like mad do drown them out. Who the hell said speech is free?",
        failMsg: "an Agrivat consultant, for $225K per year. Also a LockLoadMartyr consultant, for another $125K/yr.",
        winMsg: "I love it when a plan comes together! You've done it, Senator!",
        moves: 75, goal: 125000 },
      22: { playMsg: "You're up against a few of your fellow representatives here, so we won't go negative too early. Just stay ahead of the pack, and differentiate yourself (to the lobbyists, I mean). Whoever spends the most will have better name recognition, and that's all that matters. Research shows that when there's a hard question (who would be the best Senator) people switch gears to an easier question (who do I even know). If your name is familiar, they figure it must be for a reason...",
        failMsg: "a lobbyist for oil...and a lobbyist for agribusiness. Each pays $150K/yr. Also, the military/industrial lobby would like you to give some speeches, at $20K-a-pop.",
        winMsg: "You won the primary, but this'll be your toughest general election yet! You'll need a ton of cash. Help the financial industry until you're Too Big To Fail!",
        moves: 155, goal: 125000 },
      23: { playMsg: "Unseating an enemy incumbent is one of the toughest plays in the political game, but this is what you've been working toward. Les Moore is a 5-term Senator; he's comfortable, but weak. He thinks he's seen your kind before, but you're more ready than any of them. You've been earning a lot of good will. Now is really the time to let the banks know they've got a real opportunity here. Give them a taste of what oil, the agribiz, and weapons manufacturing have gotten. They'll pony up, too.",
        failMsg: "a LockLoadMartyr executive, for $350K/yr (starting salary).",
        winMsg: "What a rush! I can't stop laughing; Les Moore just cried during his concession speech. You have really made it now, Senator!",
        moves: 75, goal: 125000 },
      24: { playMsg: "Keep doing intimate favors for the Big Banks. They'll thank you in the morning. It's a long way to the primary, but you already know how spendy things can get. Use every legislative day of these 6 years to show the boys who matter whose side you're really on, and you can remain one of the most powerful hundred people in the country in the most powerful nation on this Earth!",
        failMsg: "a LockLoadMartyr executive, for $350K/yr (starting salary). And a confidential signing bonus...",
        winMsg: "Nice job in the primary. You have to persevere though the general election. Scratch the Big Banks' backs and they'll scratch yours ... or just give you lots of money.",
        moves: 615, goal: 125000 },
      25: { playMsg: "Duncan 'Doc' McKenzie is back. He's got unions, Pharma, and hey, Agribusiness money, too. (Guess we know who wins this election either way.) This is gonna be a slugfest.",
        failMsg: "a lobbyist for the National Ricochet Association, and another as a lobbyist for LockLoadMartyr. Each pays $200K/yr. Neither requires you to go in to work much.",
        winMsg: "Well, looks like you don't even have a primary challenger this time! The party thinks you're just too important to lose. And the financial sector agrees!",
        moves: 75, goal: 125000 },
      26: { playMsg: "You're still a young guy when it comes to the Senate. Use some of that youthful energy to stack up some favors from your friends if you want to stick around. And you can do that. This could be your career for life, if you work at it.",
        failMsg: "a financial consultant, for $350K/yr. Also, the weapons manufacturing lobby wants you to consult for them, for $150K/yr. Yes, you can do both.",
        winMsg: "Another election in the (money) bag! Now on to the next one. You have a few primary challengers, but don't worry--they're as weak as a local bank.",
        moves: 690, goal: 125000 },
      27: { playMsg: "It was funny not even having a primary, but don't expect that to happen all the time. There's always another young upstart climbing the ladder. Why, Deadeye even got her seat back after you left it. Rumor has it she might want some revenge...",
        failMsg: "an executive at Bank Of Insolvancy, for $400K/yr (starting salary), plus quarterly bonuses.",
        winMsg: "You won the primary, but you've got a difficult general election ahead. Better build up Big Bank support!",
        moves: 615, goal: 125000 },
      28: { playMsg: "If you thought Aimee was a ghost from your past, check out who's running against you in the general: Governor Johnny Q. Blick! He's got a lot of popular support, but superPACs aren't called super for nothin'. They'll twist his record around. Anything bad that happened in the state in the last four years is automatically his fault, and you won't be blamed for going negative.",
        failMsg: "a FineGamble Financial consultant. You'll make half a mil per year (which doesn't include the quarterly bonuses).",
        winMsg: "Kudos on your re-election. Now you don't even have a challenger in the next primary! Guess you can take this one to the bank (oh ho ho).",
        moves: 75, goal: 125000 },
      29: { playMsg: "Way to stick it to Johnny. I have a feeling he'll be back, though...",
        failMsg: "an executive at Bank Of Insolvancy, for $400K/yr (starting salary), plus quarterly bonuses. Also, the oil and gun lobbies want to pay you $100K/yr each, for 'vital'/(occasional) consulting.",
        winMsg: "Well, Senator, looks like you've got a challenger in the pirmary. But she's actually refused to take any money from lobbyists! This shouldn't be a tough win.",
        moves: 690, goal: 125000 },
      30: { playMsg: "The big banks have really noticed you. And the other lobbies are pretty impressed that you haven't forgotten them now that you're bankrolled by banks themselves, the industry that is obviously the single greatest source of political contributions in Washington. On the shoulders of giants (and their money), you can stand tall!",
        failMsg: "a FineGamble Financial consultant. You'll make half a mil per year (which doesn't include the quarterly bonuses). Lobbying firms in three other industries will also pay you occasional (6-figure) special consulting fees.",
        winMsg: "[fix Pharma] Your old friend Rob M. Blynde is back again to challenge you for the seat. He's got serious support from Big Pharma and Tobacco, so I guess we'll find out who has the better friends.",
        moves: 615, goal: 125000 },
      31: { playMsg: "Duncan is back for what I expect is a final go at you. He's pouring everything into this with all his usual friends (Pharma, unions, Agribusiness), even went back on his word to become a friend to the banks himself, trying to neutralize them. But actions speak louder than words (and so will money come election day), so it's time to teach Duncan a little bit about debt management. Because the banks will give him some to hedge their bet, but you can stay their favorite if you get to work.",
        failMsg: "a FineGamble Financial executive, for $750K/yr (starting salary), plus bonuses. An easy enough job that will leave you time to collect 6-figure consulting fees from other lobbying friends, er, firms.",
        winMsg: "Gulp! You're in for the fight of your life. Your opponent, a serious 'reform candidate,' has a ton of popular support and is calling you out. Time to prove to America that, in the end, special interests always win!",
        moves: 75, goal: 125000 },
      32: { playMsg: "The party has discouraged anyone thinking of running against you. As a Senior Senator now leading some powerful committees, you're too big an asset for them. They want you fresh and rested because they expect the other party is going to try to focus on knocking you out when the next election comes. But you've been campaigning your whole political life, and you aren't going to back down now. Hell, campaigning is your legislative style, so keep at it. Who knows what further rewards you may receive?",
        failMsg: "a consultant with FineGamble Financial, for half a mil every year (starting salary), plus bonuses. Also a consult with LockLoadMartyr for another quarter mil. You can still do special consulting with other firms, for a $100K fee each.",
        winMsg: "YOU WIN! In fact, you've been such a friend to so many lobbyists, that a group of them got together and decided to install you as President of the United States of America. Feel free to keep playing the game, Mr. President, but you've already won it all!",
        moves: 690, goal: 125000 },
      33: { playMsg: "Good game, Mr. President.",
        failMsg: "Well, that was fun, wasn't it. You're set for life now. And all you had to do was ignore those stupid voters.",
        moves: 1, goal: 0 }
    }
    return phaseMap[phase];
  },

  constructTokenArray: function(rawData){
    let tokens = []
    for (let tok in rawData) {
      while(rawData[tok] > 0) {
        tokens.push(tok)
        rawData[tok]--
      }
    }
    return tokens
  },

  //mid-phase reference to change message and token set (from which staged tokens are randomly drawn) and trigger for next mid-phase change
  progressGame: function(phase, moves) {
    var data,
      progressionMap = {
          1: {
            160: {
              tokens: {'oil1': 2, 'oil2': 1},
              nextTrigger: 140
            },
            140: {
              tokens: {'oil1': 6, 'oil2': 3, 'oil3': 1, 'con1': 1},
              nextTrigger: 115
            },
            115: {
              tokens: {'oil1': 5, 'oil2': 2, 'oil3': 1, 'con1': 1},
              nextTrigger: 82
            },
            82: {
              tokens: {'oil1': 5, 'oil2': 2, 'oil3': 1, 'con1': 2},
              nextTrigger: 44
            },
            44: {
              tokens: {'oil1': 8, 'oil2': 4, 'oil3': 2, 'oil4': 1, 'con1': 2},
              nextTrigger: 115
            }
          },
          2: {
            115: {
              tokens: {'oil1': 3, 'oil2': 2, 'oil3': 1, 'con1': 1},
              nextTrigger: 98
            },
            98: {
              tokens: {'oil1': 2, 'oil2': 2, 'oil3': 1, 'con1': 2},
              nextTrigger: 63
            },
            63: {
              tokens: {'oil1': 3, 'oil2': 2, 'oil3': 1, 'con1': 2, 'mega': 1},
              nextTrigger: 17
            },
            17: {
              tokens: {'oil1': 2, 'oil2': 3, 'oil3': 2, 'oil4': 1, 'con1': 2, 'mega': 1},
              nextTrigger: 33
            }
          },
          3: {
            33: {
              tokens: {'oil1': 5, 'oil2': 3, 'oil3': 1, 'oil4': 1, 'con1': 2, 'mega': 1},
              nextTrigger: 130,
              special: "hold"
            }
          },
          4: {
            130: {
              tokens: {'oil1': 8, 'oil2': 5, 'oil3': 1, 'con1': 3, 'mega': 1},
              nextTrigger: 56
            },
            56: {
              tokens: {'oil1': 4, 'oil2': 3, 'oil3': 1, 'oil4': 1, 'con1': 2, 'mega': 1},
              nextTrigger: 175 //since 6 can be skipped, this target should work for both 6 & 7
            }
          },
          6: {
            175: {
              tokens: {'oil1': 13, 'oil2': 8, 'oil3': 2, 'con1': 3, 'mega': 1},
              nextTrigger: 175
            }
          },
          7: {
            175: {
              tokens: {'oil1': 11, 'oil2': 5, 'oil3': 2, 'con1': 2, 'mega': 1, 'agr1': 1},
              nextTrigger: 101
            },
            101: {
              tokens: {'oil1': 7, 'oil2': 5, 'oil3': 2, 'con1': 3, 'mega': 1, 'agr1': 2},
              nextTrigger: 15
            },
            15: {
              tokens: {'oil1': 5, 'oil2': 3, 'oil1': 1, 'con1': 2, 'agr1': 2, 'agr2': 1},
              nextTrigger: 282
            }
          },
          8: {
            282: {
              tokens: {'oil1': 1, 'oil2': 2, 'agr1': 4, 'agr2': 1, 'con1': 2, 'mega': 1},
              nextTrigger: 172,
              special: "appeasement"
            },
            172: {
              tokens: {'oil1': 6, 'oil2': 8, 'agr1': 13, 'agr2': 7, 'con1': 4, 'mega': 2, 'pork': 1},
              nextTrigger: 46
            }
            46: {
              tokens: {'oil1': 3, 'oil2': 4, 'oil3': 1, 'agr1': 7, 'agr2': 3, 'agr3': 1, 'con1': 2, 'mega': 1},
              nextTrigger: 10
            }
          },
          10: {
            299: {
              tokens: {'oil1': 3, 'oil2': 2, 'oil3': 1, 'agr1': 11, 'agr2': 6, 'agr3': 2, 'con1': 3, 'mega': 2, 'pork': 1},
              nextTrigger: 62,
              special: "hold"
            },
            62: {
              tokens: {'oil1': 2, 'oil2': 1, 'agr1': 5, 'agr2': 3, 'agr3': 1, 'con1': 2, 'mega': 1},
              nextTrigger: 333
            }
          },
          12: {
            333: {
              tokens: {'oil1': 9, 'oil2': 13, 'oil3': 3, 'agr1': 15, 'agr2': 9, 'agr3': 3, 'con1': 4, 'mega': 2, 'pork': 1},
              nextTrigger: 42
            },
            42: {
              tokens: {'oil1': 5, 'oil2': 4, 'oil3': 1, 'agr1': 7, 'agr2': 5, 'agr3': 1, 'con1': 2, 'mega': 1, 'mil1': 2},
              nextTrigger: 129 //for both 13 && 14
            }
          },
          13: {
            129: {
              tokens: {'oil1': 5, 'oil2': 3, 'agr1': 7, 'agr2': 4, 'agr3': 2, 'mil1': 4, 'mil2': 2, 'con1': 4, 'mega': 1, 'pork': 1},
              nextTrigger: 129
            }
          },
          14: {
            129: {
              tokens: {'oil1': 3, 'oil2': 2, 'agr1': 4, 'agr2': 3, 'agr3': 1, 'mil1': 5, 'mil2': 3, 'mil3': 1, 'con1': 2, 'mega': 1},
              nextTrigger: 3
            },
            3: {
              tokens: {'oil1': 4, 'oil2': 2, 'oil3': 1, 'agr1': 6, 'agr2': 3, 'agr3': 1, 'mil1': 9, 'mil2': 4, 'mil3': 2, 'con1': 3, 'pork': 1},
              nextTrigger: 120
            }
          },
          16: {
            120: {
              tokens: {'oil1': 2, 'oil2': 2, 'oil3': 1, 'agr1': 3, 'agr2': 2, 'agr3': 1, 'mil1': 7, 'mil2': 5, 'con1': 2, 'mega': 1},
              nextTrigger: 25,
              special: "appeasement"
            },
            25: {
              tokens: {'oil1': 3, 'oil2': 4, 'oil3': 1, 'agr1': 4, 'agr2': 5, 'agr3': 1, 'mil1': 11, 'mil2': 7, 'mil3': 3, 'con1': 4, 'mega': 2, 'pork': 1},
              nextTrigger: 151
            }
          },
          18: {
            151: {
              tokens: {},
              nextTrigger: 7
            },
            7: {
              tokens: {},
              nextTrigger: 32
            }
          },
          19: {},
          
          24: {
            555: {
              tokens: ['agr2', 'agr3', 'mil1', 'mil1', 'mil2', 'mil2', 'mil3', 'fin1', 'fin1', 'fin1', 'fin1', 'fin1', 'fin2', 'fin2', 'con1', 'con1', 'con1', 'mega', 'pork', 'pork'],
              nextTrigger: 461,
              special: "hold"
            }
          },
          27: {
            461: {
              tokens: ['oil1', 'agr1', 'fin1', 'fin1', 'mil1', 'mil1', 'mega', 'mega', 'con1'], //TODO: should be big tokens just for that brief window
              nextTrigger: 459,
              msg: "The president has called a special session to address the deficit crisis. Nice work ignoring the need to pass a budget until the last minute. I wonder what you can sneak in when there's just too much at stake for certain legislation to not pass...",
              special: 'event',
              moveChange: 23
            },
            459: {
              tokens: ['oil1', 'agr1', 'mil1', 'mil2', 'mil2', 'fin1', 'fin2', 'fin2', 'fin3', 'mega', 'pork', 'con1', 'con1'],
              nextTrigger: 155 //TODO: this will change!
            }
          },
          30: {
            155: {
              tokens: ['oil1', 'oil2', 'agr1', 'agr2', 'mil1', 'mil2', 'mil2', 'mil3', 'fin1', 'fin1', 'fin2', 'fin2', 'fin3', 'fin3', 'fin4', 'con1', 'con1', 'con1', 'mega', 'mega', 'pork', 'pork'],
              nextTrigger: 777, //TODO: this will change!
              msg: 'Government shutdown! Forget all those people out of work. You need to worry about how you have less working days to get your TRUE constituents what they want. You just WEEKS!',
              special: 'event',
              moveChange: -41
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

  //utility function to format number to appear with appropriate commas
  formatNum: function(num){
    var numString = num.toString(),
      charCount = numString.length,
      leftSideCount = charCount % 3,
      segmentCount = charCount/3,
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
