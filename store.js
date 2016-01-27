import Utils from './utils';
var EventEmitter = require('events').EventEmitter;
var QuidStore = new EventEmitter();
var CHANGE_EVENT = 'change';
var currentState = {
  board: {
    rows: 6, columns: 6, grid: []
  },
  tokensArray: ['oil1', 'oil1', 'oil1', 'oil2','oil2', 'con1'],
  stagedToken: 'oil1',
  holdToken: false,
  //white paper data
  movesRemaining: 180,
  score: 0,
  bankBalance:  0,
  phase: 1,
  nextGoal: 125000,
  electedOffice: 'State Delegate',
  message: 'Click any unoccupied square in the grid to place the next item. Match 3 to make more valuable items.',
  trigger: 160, //move # at which message will change
  newMessage: true, //only true at first appearance of new message
  //special token quick refs
  megaPossCoords: [], //coordinates where megaphone can be dropped
  megaPossTokens: [], //arrays of valid tokens megaphone can become (at coordinate corresponding to megaPossCoords)
  porkOn: [], //pork tokens on board
  appeasements: [], //appeasement tokens on board
  levelFives: [], //all level5 tokens on board
  createPowerUp: [], //only has content if set about to be combined
  freeze: 0, //number of moves con1 tokens frozen for
  helpers: {
    'oil6': 0, 'agr6': 0, 'mil6': 0, 'fin6': 0, 'con2': 1, 'con3': 0, 'con5': 0
  }
};

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
        currentState.board.grid[x][y] = startingTokens[i];
    }

    //eliminate pre-matched tokens
    for (var i=0; i < rows; i++){
      for (var j = 0; j < columns; j++){
        token = currentState.board.grid[i][j];
        if (token !== '' && this.cardinalCheck(token, i, j).length >= 2){
          currentState.board.grid[i][j] = '';
        }
      }
    }
};

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

QuidStore.isEligible = function(rowPos, colPos){
  var staged = currentState.stagedToken,
  isEmpty = currentState.board.grid[rowPos][colPos] === '',
  validForMega = currentState.megaPossCoords,
  stringCoords;

  if (staged === 'mega'){
    if (isEmpty){
      stringCoords = [rowPos, colPos];
      stringCoords = JSON.stringify(stringCoords);
      return (validForMega.indexOf(stringCoords) !== -1);
    } else {
      return false;
    }
  } else if (staged === 'pork'){
    return !isEmpty;
  } else {
    return isEmpty;
  }
};

QuidStore.isAboutToGo = function(rowPos, colPos){
  var fives = currentState.createPowerUp,
    i;

  if (fives.length === 0){
    return false;
  } else {
    for (i = 0; i < fives.length; i++){
      if(rowPos === fives[i][0] && colPos === fives[i][1]){
        return true;
      }
    }
    return false
  }
};

QuidStore.useAppeasement = function(token){
  if (currentState.holdToken === false){
    currentState.holdToken = currentState.stagedToken;
  }
  currentState.stagedToken = token;
  this.emitChange();
};

QuidStore.usePowerUp = function(token){
  var type = token.slice(0,3),
    cons;

  if (type === 'oil') {
    currentState.bankBalance = currentState.bankBalance + 25000;
  } else if (type === 'agr'){
    currentState.freeze = currentState.freeze + 10;
  } else if (type === 'mil'){
    cons = this.findTokenCoords('con1');
    this.clearMatches(cons);
  } else {
    currentState.bankBalance = currentState.bankBalance + 250000;
  }
  currentState.helpers[token]--;
  this.emitChange();
}

QuidStore.completeMove = function(rowPos, colPos){
  var token = currentState.stagedToken,
    moves = currentState.movesRemaining,
    swarm = false,
    progressionData;

  //handle placement of tokens
  if (token === 'mega'){
    token = this.convertMega(rowPos, colPos);
  } else if (token === 'pork'){
    currentState.porkOn.push( JSON.stringify([rowPos, colPos]) );
  } else if (token.slice(0,3) === 'con' && token !== 'con1'){
    currentState.appeasements.push( [rowPos, colPos] );
  }
  token = this.handleMatches(token, rowPos, colPos);
  currentState.board.grid[rowPos][colPos] = token;

  //handle special token removal
  if (currentState.createPowerUp.length !== 0){
    this.removeTopLevelTokens();
  }
  if (currentState.appeasements.length !==0){
    this.removeConstituents(token, rowPos, colPos);
  }

  //update move count, handle phase/move-triggered events
  currentState.movesRemaining--;
  if (moves === 0){
    this.handleElection();
    currentState.newMessage = true;
  } else if (moves === currentState.trigger) {
    progressionData = Utils.progressGame(currentState.phase, moves);
    if (typeof progressionData !== 'undefined'){
      currentState.tokensArray = progressionData.tokens;
      currentState.message = progressionData.msg;
      currentState.trigger = progressionData.nextTrigger;
      currentState.newMessage = true;
    }
  } else {
    currentState.newMessage = false;
  }

  //check game end, proceed to automatic actions
  if (this.isGameOver()){
    this.endGame('board');
  } else {
    if (currentState.appeasements.length + 3 < currentState.levelFives.length && currentState.movesRemaining % 7 === 1){
      swarm = true;
    }
    this.moveConstituents(rowPos, colPos, swarm);
    this.setNextToken();
    if (token.slice(3,4) === '5'){
      this.addTopLevelToken(token, rowPos, colPos);
    }
  }
  this.emitChange();
};

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
      token = currentState.board.grid[rowPos][colPos];
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

    if (currentState.board.grid[checkRow][checkCol] === token) {
      matchCoords.push([checkRow, checkCol]);
    }
  }
  return matchCoords;
};

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
          currentState.board.grid[newRowPos][newColPos] = 'con1';
          if (!swarm) {
            currentState.board.grid[x][y] = '';
          }
        }
      }
    }
  } else {
    currentState.freeze--;
  }
};

QuidStore.removeConstituents = function(token, rowPos, colPos){
  var appeasements = currentState.appeasements,
    me = this,
    toClearCoords;

  appeasements.forEach( function(app){
    toClearCoords = me.cardinalCheck('con1', app[0], app[1]);
    me.clearMatches(toClearCoords);
  });
  currentState.board.grid[rowPos][colPos] = token;
};

QuidStore.setNextToken = function(){
  var tokens = currentState.tokensArray,
    valStrings = [];

  if (currentState.holdToken === false){
    currentState.stagedToken = tokens[Math.floor(Math.random() * tokens.length)];
  } else {
    currentState.stagedToken = currentState.holdToken;
    currentState.holdToken = false;
  }

  if (currentState.stagedToken === 'mega'){
    this.checkMegaValid();
    if (currentState.megaPossCoords.length === 0) {
      this.setNextToken();
    }
  }
};

QuidStore.addTopLevelToken = function(token, rowPos, colPos){
  var stringCoords = JSON.stringify([rowPos, colPos]),
    sameTokenCoords = this.findTokenCoords(token);
  currentState.levelFives.push(stringCoords);
  if (sameTokenCoords.length === 5){
    currentState.createPowerUp = sameTokenCoords;
  }
};

QuidStore.removeTopLevelTokens = function(){
  var coords = currentState.createPowerUp,
    token = currentState.board.grid[coords[0][0]][coords[0][1]],
    powerUp = token.slice(0, 3) + '6',
    stringCoords,
    index;

  this.clearMatches(coords);
  coords.forEach( function(spot){
    stringCoords = JSON.stringify(spot);
    index = currentState.levelFives.indexOf(stringCoords);
    currentState.levelFives.splice(index, 1);
  });
  currentState.createPowerUp = [];
  currentState.helpers[powerUp]++
  currentState.score = currentState.score + 555;
}

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

QuidStore.clearMatches = function(matches){
  for (var i = 0; i < matches.length; i++){
    currentState.board.grid[matches[i][0]][matches[i][1]] = '';
  }
};

QuidStore.handleScoreboard = function(count, token, isRecursive) {
  var points = 0,
    money = 0,
    bigMatchFactor = 1;
  if (count < 2 && isRecursive !== true) {
    points = Utils.getTokenData(token, 'pts');
    money = Utils.getTokenData(token, 'val');
  } else if (count >= 2){
    bigMatchFactor = bigMatchFactor + (count * 0.75);
    points = Utils.getTokenData(token, 'mPts');
    points = Math.round(points * bigMatchFactor);
    money = Utils.getTokenData(token, 'mVal');
    money = Math.round(money * bigMatchFactor);
    if (isRecursive){
      points = Math.round(points * 1.3);
      money = Math.round(money * 1.25);
    }
  }
  currentState.score = currentState.score + points;
  currentState.bankBalance = currentState.bankBalance + money;
};

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
        currentState.board.grid[pork[0]][pork[1]] = '';
      });
    }
  });
};

QuidStore.handleElection = function(){
  currentState.bankBalance = currentState.bankBalance - currentState.nextGoal;
  if (currentState.bankBalance < 0){
    this.endGame('election');
  } else {
    currentState.phase++;
    this.changePhase(currentState.phase);
  }
};

//TODO: all of these Utils maps need to be filled out for whole game
QuidStore.changePhase = function(phase){
  var phaseData = Utils.getPhaseData(phase),
    coords;
  //change every election
  currentState.movesRemaining = phaseData.moves;
  currentState.nextGoal = phaseData.goal;

  //change more often (tokensArray also, but not on phase change)
  currentState.message = phaseData.msg;

  //changes less often
  currentState.electedOffice = Utils.setElectedOffice(phase, currentState.electedOffice);
  coords = Utils.handleBoardChange(currentState.electedOffice);
  currentState.board.rows = coords[0];
  currentState.board.columns = coords[1];
};

QuidStore.isGameOver = function(){
  var board = currentState.board,
    gameOver = true;

  for (var i=0; i < board.rows; i++) {
    for (var j = 0; j < board.columns; j++){
      if (board.grid[i][j] === ''){
        gameOver = false;
        return gameOver;
      }
    }
  }
  return gameOver;
};

//TODO: Button to restart game needs to replace stagedToken?
QuidStore.endGame = function(failType){
  var reason = 'Game Over.';
  if (failType === 'board'){
    reason = reason + ' Talk about gridlock!'
  } else if (failType === 'election'){
    reason = reason + ' People can be bought, just not always by you.'
  }
  currentState.stagedToken = '';
  currentState.message = reason;
};

export default QuidStore;
