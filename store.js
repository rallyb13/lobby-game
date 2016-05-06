import Utils from './utils';
var EventEmitter = require('events').EventEmitter;
var QuidStore = new EventEmitter();
var CHANGE_EVENT = 'change';
var currentState = {
  board: {
    rows: 6, columns: 6, grid: []
  },
  tokensArray: ['oil1', 'oil1', 'oil1', 'oil2'],
  stagedToken: 'oil1',
  holdTokens: ['', '', '', ''],
  //white paper data
  movesRemaining: 180,
  score: 0,
  bankBalance: 0,
  phase: 1,
  repeat: 0, //tracks if level is repeated (when higher office declined)
  nextGoal: 50000,
  electedOffice: 'State Delegate',
  message: 'Click any unoccupied square in the grid to place the next item. Match 3 oils drops to make an oil can...',
  advMsg: 'none',
  advanceQuestion: false, //true when phase change should prompt choice of office advancement
  trigger: 160, //move # at which message will change
  newMessage: true, //only true at first appearance of new message
  //special token quick refs
  megaPossCoords: [], //coordinates where megaphone can be dropped
  megaPossTokens: [], //arrays of valid tokens megaphone can become (at coordinate corresponding to megaPossCoords)
  porkOn: [], //pork tokens on board
  appeasements: [], //appeasement tokens on board
  levelFives: [], //all level5 tokens on board
  createFavor: [], //only has content if set about to be combined
  freeze: 0, //number of moves con1 tokens frozen for
  helpers: {
    'oil6': 0, 'agr6': 0, 'mil6': 0, 'fin6': 0, 'con2': 1, 'con3': 0, 'con5': 0
  },
  helperChange: false
};

//sets board at beginning of game, with randomly-set tokens included (SINGLE USE--not used for board resize)
QuidStore.setupBoard = function () {
  var rows = currentState.board.rows,
    columns = currentState.board.columns,
    startingTokens = ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'con1', 'oil2', 'oil3', 'oil1', 'oil1', 'oil2'],
    token;

  for (var i=0; i < rows; i++) {
    var row = [];
    for (var j=0; j < columns; j++) {
      row.push('');
    }
    currentState.board.grid.push(row);
  }

  // go though starting tokens and put the values on the board
  for (var i=0; i < startingTokens.length; i++) {
    var x = Math.floor(Math.random() * rows),
      y = Math.floor(Math.random() * columns);
      this.setToken(startingTokens[i], x, y);
  }

  //eliminate pre-matched tokens
  for (var i=0; i < rows; i++){
    for (var j = 0; j < columns; j++){
      token = this.getToken(i, j);
      if (token !== '' && this.cardinalCheck(token, i, j).length >= 2){
        this.setToken('', i, j);
      }
    }
  }
};

//
//
//******** CORE FUNCTIONS FOR NOTIFYING CHANGE OF & PASSING OF STATE OBJECT
//
//

//Emit change to notify top level App.js of state change
QuidStore.emitChange = function() {
  this.emit(CHANGE_EVENT);
};

QuidStore.addChangeListener = function(callback) {
  this.on(CHANGE_EVENT, callback);
};

QuidStore.removeChangeListener = function(callback) {
  this.removeListener(CHANGE_EVENT, callback);
};

QuidStore.getCurrentState = function(){
  return currentState;
};

//
//
//************** STATE CHANGE HELPER FUNCTIONS
//
//

//helper fn to return token placed at specific GridSquare by coordinates
QuidStore.getToken = function (rowPos, colPos){
  return currentState.board.grid[rowPos][colPos];
};

//helper fn to change token at a specific GridSquare by coordinates
QuidStore.setToken = function (token, rowPos, colPos){
  currentState.board.grid[rowPos][colPos] = token;
};

//helper fn to make selected appeasement token the next staged token
//emits its own change as this does NOT trigger a move completion
QuidStore.selectThisToken = function(token){
  currentState.holdTokens[0] = currentState.stagedToken;
  currentState.stagedToken = token;
  this.emitChange();
};

//helper fn to update bank bankBalance
QuidStore.deposit = function(num){
  currentState.bankBalance = currentState.bankBalance + num;
};

QuidStore.score = function(num){
  currentState.score = currentState.score + num;
};

//helper fn to intiate a 10-move hiatus from constituents moving on move completion
//triggered by use of 'agr' Favor
QuidStore.freezeCons = function(){
  currentState.freeze = currentState.freeze + 10;
};

//helper fn to update the bench with favors upon earning/using them
//emits its own change as this is not considered a game "move"
QuidStore.changeHelperCount = function(token, removal){
  if(removal){
    currentState.helpers[token]--;
  } else {
    currentState.helpers[token]++;
  }
  this.emitChange();
};

//helper fn to handle special case of NOT advancing game phase when player opts not to run for higher office
QuidStore.rerunPhase = function(doAdd){
  if (doAdd){
    currentState.repeat++;
  } else {
    currentState.repeat = 0;
  }
};

//when match is made, resets to empty squares all tokens matched-to (newly matched token appears where match-making token placed)
QuidStore.clearMatches = function(matches){
  for (var i = 0; i < matches.length; i++){
    this.setToken('', matches[i][0], matches[i][1]);
  }
};

//
//
//************ INDEXING FUNCTIONS TO HELP GAME LOGIC FUNCTIONALITY REFERENCING BOARD/COORDINATE DATA
//
//

//indexing fn setting new squares to empty string upon their creation at board resize
QuidStore.handleNewSquares = function(){
  var newSquares = this.findTokenCoords(undefined),
    me = this;
  newSquares.forEach( function(ns){
    me.setToken('', ns[0], ns[1]);
  });
};

//indexing fn in helping find matches by first returning coordinates of all valid neighboring spaces
//key here is that GridSquares along border only return true/on-the-board coords
QuidStore.getAdjacents = function(rowPos, colPos){
  var adjacents = [],
    board = currentState.board;

  if (rowPos > 0){
    adjacents.push([rowPos-1, colPos]);
  }
  if (colPos > 0){
    adjacents.push([rowPos, colPos-1]);
  }
  if (rowPos + 1 < board.rows){
    adjacents.push([rowPos+1, colPos]);
  }
  if (colPos + 1 < board.columns){
    adjacents.push([rowPos, colPos+1])
  }
  return adjacents;
};

//indexing fn to check for bordering GridSquares that share the same token, returns applicable coords
QuidStore.cardinalCheck = function(token, rowPos, colPos){
  var possibleMatches = this.getAdjacents(rowPos, colPos),
    matchCoords = [],
    checkRow,
    checkCol,
    squareToken,
    i;

  for (i = 0; i < possibleMatches.length; i++){
    checkRow = possibleMatches[i][0];
    checkCol = possibleMatches[i][1];

    if (this.getToken(checkRow,checkCol) === token) {
      matchCoords.push([checkRow, checkCol]);
    }
  }
  return matchCoords;
};

//indexing fn find all coordinates where a specific type of token exists
//useful check for constituents (to move them all), for empty spaces (valid move checks & game continuation), etc.
QuidStore.findTokenCoords = function(token){
  var board = currentState.board,
    array = [],
    currentConsCoords = [];

  for (var i=0; i < board.rows; i++) {
    for (var j = 0; j < board.columns; j++){
      if (board.grid[i][j] === token){
        array.push(i);
        array.push(j);
        currentConsCoords.push(array);
      }
      array = [];
    }
  }
  return currentConsCoords;
};

//
//
//************* CORE GAME LOGIC FUNCTIONALITY
//
//

//after user selects GridSquare for available token, most of the game logic takes place here
//placing tokens (including handling matches), moving constituents, updating White Paper (w/ related actions) all checked/initated here
QuidStore.completeMove = function(rowPos, colPos){
  var token = currentState.stagedToken,
    swarm = false;

  //handle placement of tokens
  if (token === 'mega'){
    token = this.convertMega(rowPos, colPos);
  } else if (token === 'pork'){
    currentState.porkOn.push( JSON.stringify([rowPos, colPos]) );
  } else if (token.slice(0,3) === 'con' && token !== 'con1'){
    this.addAppeasement(token, rowPos, colPos);
  }
  token = this.handleMatches(token, rowPos, colPos);
  this.setToken(token, rowPos, colPos);

  this.payForHolds();
  this.nextMove();

  //handle special token removal
  if (currentState.createFavor.length !== 0){
    this.removeTopLevelTokens();
  } else {
    currentState.helperChange = false;
  }
  if (currentState.appeasements.length !==0){
    this.checkAppeasements(false);
    this.removeConstituents(token, rowPos, colPos);
  }

  //handle constituents
  if (currentState.appeasements.length + 3 < currentState.levelFives.length && currentState.movesRemaining % 7 === 1){
    swarm = true;
  }
  this.moveConstituents(rowPos, colPos, swarm);

  this.setNextToken();
  if (token.slice(3,4) === '5'){
    this.addTopLevelToken(token, rowPos, colPos);
  }
  this.emitChange();
};

//called by complete move, handles move countdown:
//checks for next trigger (of msg & token selection changes) && for end of countdown (which triggers phase change)
//also has special logic for late-in-game surprise changes to move counter (and handles appeasement tokens on board at the time)
QuidStore.nextMove = function(){
  var moves = currentState.movesRemaining,
    progressionData,
    moveChange;

  if (currentState.phase <= 32){
    currentState.movesRemaining--;
  } else {
    currentState.movesRemaining++;
  }

  if (moves === 0){
    this.handleElection(currentState.repeat % 3);
  }
  else if (moves === currentState.trigger) {
    progressionData = Utils.progressGame(currentState.phase, moves);
    if (progressionData !== false){
      currentState.tokensArray = progressionData.tokens;
      currentState.message = progressionData.msg;
      currentState.trigger = progressionData.nextTrigger;
      currentState.newMessage = true;
      moveChange = progressionData.moveChange;
      if (typeof moveChange !== 'undefined'){
        currentState.movesRemaining = currentState.movesRemaining + moveChange;
        if (moveChange < 0 && currentState.appeasements.length > 0){
          this.checkAppeasements(true);
        }
      }
    }
  } else if (moves !== currentState.trigger && moves !== 0){
    currentState.newMessage = false;
  }
};

//only used when megaphone is staged token: evaluates all spaces on board where placement could complete a match
//stores locations and corresponding token-to-be-matched into state, so that board will not allow placement elsewhere
QuidStore.checkMegaValid = function(){
    var blanks = this.findTokenCoords(''),
    neighbors = [],
    neighTokens = [],
    me = this,
    validSpaces = [],
    combos = [],
    comboOptions = [],
    stringCoords,
    rowPos,
    colPos,
    token;

  //Loop through array of empty space coords to check mega validity:
  blanks.forEach(function (blank) {
    stringCoords = JSON.stringify(blank);
    neighbors = me.getAdjacents(blank[0], blank[1]);
    //Each neighbor of a blank space, if holding a combinable token...
    for(var i = 0; i < neighbors.length; i++){
      rowPos = neighbors[i][0];
      colPos = neighbors[i][1];
      token = me.getToken(rowPos, colPos);
      if (token !== '' && token.slice(0,3) !== 'con' && token.slice(3) !== '5'){
        //might already have a pair...
        if(me.cardinalCheck(token, rowPos, colPos).length > 0){
          combos.push(token);
          if (validSpaces.indexOf(stringCoords) === -1){
            validSpaces.push(stringCoords);
          }
        //or might have a match with another neighbor we need to check for next:
        } else {
          neighTokens.push(token);
        }
      }
    }
    //all previously unmatched neighbors are checked against each other
    while (neighTokens.length > 1){
      token = neighTokens.pop();
      if (neighTokens.indexOf(token) !== -1){
        combos.push(token);
        if (validSpaces.indexOf(stringCoords) === -1){
          validSpaces.push(stringCoords);
        }
      }
    }
    if (combos.length > 0) {
      comboOptions.push(combos);
    }
    neighTokens = [];
    combos = [];
  });
  currentState.megaPossCoords = validSpaces;
  currentState.megaPossTokens = comboOptions;
};

//as part of completing a move, the constituents each take a single step (if they can) in a random direction
QuidStore.moveConstituents = function(rowPos, colPos, swarm) {
  var currentConsCoords = this.findTokenCoords('con1'),
    emptyCoords = [],
    newRowPos,
    newColPos,
    newCoords,
    x,
    y;
  if (currentState.freeze === 0){
    for (var i = 0; i < currentConsCoords.length; i++) {
      x = currentConsCoords[i][0],
      y = currentConsCoords[i][1];
      if(x !== rowPos || y !== colPos){
        emptyCoords = this.cardinalCheck('', x, y);
        if (emptyCoords.length > 0) {
          newCoords = emptyCoords[Math.floor(Math.random() * emptyCoords.length)];
          newRowPos = newCoords[0];
          newColPos = newCoords[1];
          this.setToken('con1', newRowPos, newColPos);
          if (!swarm) {
            this.setToken('', x, y);
          }
        }
      }
    }
  } else {
    currentState.freeze--;
  }
};

//whenever constituents come in contact with appeasement tokens at completion of one move,
//they disappear from the board on completion of next move
QuidStore.removeConstituents = function(token, rowPos, colPos){
  var appeasements = currentState.appeasements,
    me = this,
    toClearCoords;

  appeasements.forEach( function(app){
    toClearCoords = me.cardinalCheck('con1', app[0], app[1]);
    me.clearMatches(toClearCoords);
  });
  this.setToken(token, rowPos, colPos);
};

//places appeasement token on board for a random number of moves
//adds removal time into state object
//this function is also used for higher level appeasement token "decay" (as each decay-state is actually considered a separate token data-wise)
QuidStore.addAppeasement = function(token, rowPos, colPos){
  var min = Utils.getTokenData(token, 'dMin'),
    max = Utils.getTokenData(token, 'dMax'),
    time = Math.floor(Math.random() * (max - min) ) + min,
    moveTrigger = currentState.movesRemaining - time,
    phaseTrigger = currentState.phase;

  while (moveTrigger < 0){
    phaseTrigger++;
    moveTrigger = moveTrigger + Utils.getPhaseData(phaseTrigger)['moves'];
  }
  currentState.appeasements.push( [rowPos, colPos, token, moveTrigger, phaseTrigger] );
};

//when appeasement tokens are in use, this checks removal times and calls for removal as appropriate
QuidStore.checkAppeasements = function(special){
  var appeasements = currentState.appeasements,
    phase = currentState.phase,
    move = currentState.movesRemaining,
    indexes = [],
    isTarget,
    i;

  for (i = appeasements.length - 1; i >= 0; i--){
    isTarget = special ? (appeasements[i][3] >= move) : (appeasements[i][3] === move);
    if(appeasements[i][4] === phase && isTarget){
      this.removeAppeasement(i, appeasements[i][0], appeasements[i][1], appeasements[i][2]);
    }
  }
};

//removes appeasement from board
//for higher level appeasements, also calls addAppeasement fn for next decay-state token
QuidStore.removeAppeasement = function(index, rowPos, colPos, token){
  var newToken = Utils.getTokenData(token, 'nextDown');
  currentState.appeasements.splice(index, 1);
  this.setToken(newToken, rowPos, colPos);

  if (newToken !== ''){
    this.addAppeasement(newToken, rowPos, colPos);
  }
};

//moves staged token into token-holding spot by position, calls setNextToken
QuidStore.holdTokenHere = function(position){
  var toHold = currentState.stagedToken;
  currentState.holdTokens[position] = toHold;
  this.setNextToken();
  this.emitChange();
};

//clears the token from holding area, calls helper to set it as staged
QuidStore.useHeldToken = function(position, token){
  currentState.holdTokens[position] = '';
  this.selectThisToken(token);
};

//checks the holdTokens data and adjusts bankBalance
QuidStore.payForHolds = function(){
  var first = currentState.holdTokens[1] === '' ? 0 : 10,
      second = currentState.holdTokens[2] === '' ? 0 : 100,
      third = currentState.holdTokens[3] === '' ? 0 : 1000,
      cost = first + second + third;
  this.deposit(-cost);
};

//randomly selects the next staged token from the current array of those available
//handles user selecting appeasement by "holding" token that had been selected, to bring it back next
//checks megaphone token validity and recursively sets a new token when there are none
QuidStore.setNextToken = function(){
  var tokens = currentState.tokensArray,
    valStrings = [];

  if (currentState.holdTokens[0] === ''){
    currentState.stagedToken = tokens[Math.floor(Math.random() * tokens.length)];
  } else {
    currentState.stagedToken = currentState.holdTokens[0];
    currentState.holdTokens[0] = '';
  }

  if (currentState.stagedToken === 'mega'){
    this.checkMegaValid();
    if (currentState.megaPossCoords.length === 0) {
      this.setNextToken();
    }
  }
};

//records the creation of each un-matchable 5th-in-series token
//if this is 5th of that specific token, notifies state of their coords for removal/reward triggers
QuidStore.addTopLevelToken = function(token, rowPos, colPos){
  var stringCoords = JSON.stringify([rowPos, colPos]),
    sameTokenCoords = this.findTokenCoords(token);
  currentState.levelFives.push(stringCoords);
  if (sameTokenCoords.length === 5){
    currentState.createFavor = sameTokenCoords;
  }
};

//removes a 5-set of un-matchable 5th-in-series tokens (from both board and state's record of top level tokens on board)
//updates favor count in state, creating reward
QuidStore.removeTopLevelTokens = function(){
  var coords = currentState.createFavor,
    token = this.getToken(coords[0][0], coords[0][1]),
    favor = token.slice(0, 3) + '6',
    stringCoords,
    index;

  this.clearMatches(coords);
  coords.forEach( function(spot){
    stringCoords = JSON.stringify(spot);
    index = currentState.levelFives.indexOf(stringCoords);
    currentState.levelFives.splice(index, 1);
  });
  currentState.createFavor = [];
  currentState.helpers[favor]++;
  currentState.helperChange = favor;
  currentState.score = currentState.score + 555;
}

//returns token megaphone (wild card) should be (always one that triggers a matching action)
//key here is selecting the correct token if there are multiple match possibilities
//if unrelated matches are involved, highest-value token should be selected,
//but if recursive matching can take place with related tokens, lowest-value token in chain should be selected
QuidStore.convertMega = function(rowPos, colPos){
    var possTokensMap = currentState.megaPossTokens,
      tokensMap = currentState.megaPossCoords,
      coords = JSON.stringify( [rowPos, colPos] ),
      index1 = tokensMap.indexOf(coords),
      possTokens = possTokensMap[index1],
      priorities = [],
      bestPriority,
      index2;

  if (possTokens.length === 1){
    return possTokens[0];
  } else {
    possTokens.forEach( function(tok) {
      priorities.push(Utils.getTokenData(tok, 'priority'));
    });
    bestPriority = Math.min.apply(Math, priorities);
    while (priorities.indexOf(bestPriority + 1) !== -1){
      bestPriority = bestPriority + 1;
    }
    index2 = priorities.indexOf(bestPriority);
    return possTokens[index2];
  }
};

//core logic of CHECKING for match: will return new token a valid match creates or (when no match made) original token
//removes matched-to tokens from board and handles recursive matching
//since score/bank balance earned is tied in to how match is made, calls for update of those from here
QuidStore.handleMatches = function(token, rowPos, colPos, isRecursive){
  var matchCoords = this.cardinalCheck(token, rowPos, colPos),
    moreCoords = [],
    toAddCoords = [],
    newToken;

  if (matchCoords.length > 0){
    for (var i = 0; i < matchCoords.length; i++){
      moreCoords = this.cardinalCheck(token, matchCoords[i][0], matchCoords[i][1]);
      if (moreCoords.length > 0){
        toAddCoords = toAddCoords.concat(moreCoords);
      }
    }
  }
  if (toAddCoords.length > 0){
    matchCoords = matchCoords.concat(toAddCoords);
  }

  this.handleScoreboard(matchCoords.length, token, isRecursive);

  if (matchCoords.length >= 2){
    newToken = Utils.getTokenData(token, 'nextUp');
    if (newToken !== 'final') {
      if (currentState.porkOn.length > 0){
        this.handlePork(matchCoords, rowPos, colPos);
      }
      this.clearMatches(matchCoords);
      newToken = this.handleMatches(newToken, rowPos, colPos, true);
      return newToken;
    } else {
      return token;
    }
  } else {
    return token;
  }
};

//called from within hanldeMatch fn, calculates appropriate score/bank balance boost
QuidStore.handleScoreboard =function(count, token, isRecursive) {
  var points = 0,
    money = 0,
    bigMatchFactor = 1;

  if (count < 2 && isRecursive !== true) {
    points = Utils.getTokenData(token, 'pts');
    money = Utils.getTokenData(token, 'val');
  } else if (count >= 2){
    if (count !== 2 && Utils.getTokenData(token, 'nextUp') !== 'final'){
      bigMatchFactor = (count === 2) ? 1 : 1 + (count * 0.75);
    }
    points = Utils.getTokenData(token, 'mPts');
    points = Math.round(points * bigMatchFactor);
    money = Utils.getTokenData(token, 'mVal');
    money = Math.round(money * bigMatchFactor);
    if (isRecursive){
      points = Math.round(points * 1.3);
      money = Math.round(money * 1.25);
    }
  }
  this.score(points);
  this.deposit(money);
};

//when pork tokens are on the board && match has been made:
//each matched token checks if a pork token is adjacent and removes it if so
QuidStore.handlePork = function(matches, rowPos, colPos){
  var me = this,
    porkers,
    stringCoords,
    index;

  matches.push([rowPos, colPos]);
  matches.forEach( function(match) {
    porkers = me.cardinalCheck('pork', match[0], match[1]);
    if (porkers.length > 0){
      porkers.forEach( function (pork){
        stringCoords = JSON.stringify(pork);
        index = currentState.porkOn.indexOf(stringCoords);
        currentState.porkOn.splice(index, 1);
        me.setToken('', pork[0], pork[1]);
      });
    }
  });
};

//core game functionality: called if game continues at moves reaching zero/bank balance checked
//many changes to game situation are changed by this "level up" and so triggered here
//at office change, board resize takes place
QuidStore.changePhase = function(phaseShift){
  var phase,
    phaseData,
    coords;

  currentState.phase = currentState.phase + phaseShift;
  phase = currentState.phase;
  phaseData = Utils.getPhaseData(phase);

  if (phase === 8){
    this.changeHelperCount('con3', false);
  } else if (phase === 16){
    this.changeHelperCount('con5', false);
  }

  //change every election
  currentState.movesRemaining = phaseData.moves;
  currentState.nextGoal = phaseData.goal;

  //change more often (tokensArray also, but not on phase change)
  currentState.message = phaseData.msg;
  currentState.newMessage = true;

  //changes less often
  currentState.electedOffice = Utils.setElectedOffice(phase, currentState.electedOffice);
  coords = Utils.handleBoardChange(currentState.electedOffice);
  if (currentState.board.rows !== coords[0]){
    currentState.board.rows = coords[0];
    currentState.board.grid.push([]);
    this.handleNewSquares();
  }
  if (currentState.board.columns !== coords[1]){
    currentState.board.columns = coords[1];
    this.handleNewSquares();
  }
  this.emitChange();
};

//when moves hit 0 left, checks bank balance to determine if game continues
//handles setting higher office election choices at specific phases
QuidStore.handleElection = function(repeat){
  var phase = currentState.phase,
    advMsg = Utils.setElectionChoice(phase);

  this.deposit(-currentState.nextGoal);
  if (currentState.bankBalance <= 0){
    currentState.advMsg = 'bank';
    this.emitChange();
    return;
  }

  if (phase === 19){
    advMsg = advMsg[repeat];
  }
  if (advMsg === 'none'){
    this.changePhase(1);
  }
  currentState.advMsg = advMsg;
};

export default QuidStore;
