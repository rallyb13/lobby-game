import Utils from './utils';
var EventEmitter = require('events').EventEmitter;
var QuidStore = new EventEmitter();
var CHANGE_EVENT = 'change';
var currentState = {
  board: {
    rows: 6,
    columns: 6,
    grid: []
  },
  tokensArray: ['oil1', 'mil1', 'fin1', 'agr1', 'mega'],
  stagedToken: 'oil1',
  movesRemaining: 730,
  score: 0,
  bankBalance:  0,
  phase: 1,
  nextGoal: 125000,
  message: 'Click any unoccupied square in the grid to place the next item. Try to match 3 to build up to better items.',
  electedOffice: 'State Delegate',
  megaAccepts: []
};

QuidStore.setupBoard = function () {
  var rows = currentState.board.rows,
    columns = currentState.board.columns,
    startingTokens = ['mil1', 'agr1', 'fin1', 'oil1', 'oil1', 'oil2', 'con', 'oil2', 'oil3', 'oil1', 'oil1', 'oil2'],
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
  validForMega = currentState.megaAccepts,
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

QuidStore.completeMove = function(rowPos, colPos){
  var playedToken = currentState.stagedToken;

  if (playedToken === 'mega'){
    playedToken = this.convertMega(rowPos, colPos);
  }
  playedToken = this.handleMatches(playedToken, rowPos, colPos);
  currentState.board.grid[rowPos][colPos] = playedToken;
  currentState.movesRemaining--;
  if (currentState.movesRemaining === 0){
    this.handleElection();
  }

  if (this.isGameOver()){
    this.endGame('board');
  } else {
    this.moveConstituents(rowPos, colPos);
    this.setNextToken();
  }
  this.emitChange();
};

QuidStore.checkMegaValid = function(){
  var doubles = this.checkPairs(),
    validSpaces = [],
    me = this,
    checks = [];

  doubles.forEach(function (double) {
    checks = me.cardinalCheck('', double[0], double[1]);
    if(checks.length > 0){
      checks.forEach(function (check) {
        validSpaces.push(check);
      });
    }
  });
  return validSpaces;
}

QuidStore.checkPairs = function(){
  var board = currentState.board,
  doubles = [],
  coords = [],
  token;

  for (var i=0; i < board.rows; i++){
    for (var j = 0; j < board.columns; j++){
      token = board.grid[i][j];
      if (token !== '' && token !== 'con') {
        coords = this.cardinalCheck(token, i, j);
        if (coords.length === 1){
          doubles.push(coords[0]);
        }
      }
    }
  }
  return doubles;
};

QuidStore.getAdjacents = function(rowPos, colPos){
  return [ [rowPos, colPos+1], [rowPos, colPos-1], [rowPos+1, colPos], [rowPos-1, colPos] ];
}

QuidStore.cardinalCheck = function(token, rowPos, colPos){
  var possibleMatches = this.getAdjacents(rowPos, colPos),
    board = currentState.board,
    matchCoords = [],
    checkRow,
    checkCol,
    squareToken,
    i;

  for (i = 0; i < possibleMatches.length; i++){
    checkRow = possibleMatches[i][0];
    checkCol = possibleMatches[i][1];

    if (checkRow >= 0 && checkRow < board.rows && checkCol >= 0 && checkCol < board.columns ) {
      if (currentState.board.grid[checkRow][checkCol] === token) {
        matchCoords.push([checkRow, checkCol]);
      }
    }
  }
  return matchCoords;
};

QuidStore.findTokenType = function(token){
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

QuidStore.moveConstituents = function(rowPos, colPos) {
  var currentConsCoords = this.findTokenType('con'),
    emptyCoords = [],
    newRowPos,
    newColPos,
    newCoords,
    x,
    y;

  for (var i = 0; i < currentConsCoords.length; i++) {
    x = currentConsCoords[i][0],
    y = currentConsCoords[i][1];
    if(x !== rowPos || y !== colPos){
      emptyCoords = this.cardinalCheck('', x, y);
      if (emptyCoords.length > 0) {
        newCoords = emptyCoords[Math.floor(Math.random() * emptyCoords.length)];
        newRowPos = newCoords[0];
        newColPos = newCoords[1];
        currentState.board.grid[newRowPos][newColPos] = 'con';
        currentState.board.grid[x][y] = '';
      }
    }
  }
};

QuidStore.setNextToken = function(){
  var tokens = currentState.tokensArray,
    valStrings = [],
    validEmpties;

  currentState.stagedToken = tokens[Math.floor(Math.random() * tokens.length)];

  //special case of megaphone token requires board know if there are valid moves for it
  //and in order to let squares know which are eligible, want array of (stringified) coords
  if (currentState.stagedToken === 'mega'){
    validEmpties = this.checkMegaValid();
    if (validEmpties.length > 0) {
      validEmpties.forEach( function(val) {
        valStrings.push(JSON.stringify(val));
      });
      currentState.megaAccepts = valStrings;
    } else {
      this.setNextToken();
    }
  }
};

QuidStore.convertMega = function(rowPos, colPos){
  var adjacents = this.getAdjacents(rowPos, colPos),
    nearTokens = [],
    possMatchTokens = [],
    me = this,
    token,
    rowCheck,
    colCheck;

  adjacents.forEach( function(adj){
    rowCheck = adj[0];
    colCheck = adj[1];
    token = currentState.board.grid[rowCheck][colCheck];
    if (token !== '' && token !== 'con' && token !== 'pork'){
      nearTokens.push(token);
      if (me.cardinalCheck(token, rowCheck, colCheck).length > 0){
        possMatchTokens.push(token);
      }
    }
  });
  if (possMatchTokens.length === 1){
    return possMatchTokens[0];
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

QuidStore.handleElection = function(){
  currentState.bankBalance = currentState.bankBalance - currentState.nextGoal;
  if (currentState.bankBalance < 0){
    this.endGame('election');
  } else {
    currentState.phase++;
    this.changePhase(currentState.phase);
    //TODO: final tokens-->lobbyist bench conversion???
  }
};

//TODO: all of these Utils maps need to be filled out for whole game
QuidStore.changePhase = function(phase){
  var coords;
  //change every election
  currentState.movesRemaining = Utils.resetMovesCounter(phase);
  currentState.nextGoal = Utils.setNextGoal(phase);

  //change more often
  // currentState.tokensArray = Utils.changePossibleTokens(phase, currentState.movesRemaining);
  currentState.message = Utils.changeMessage(phase, currentState.movesRemaining);

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
