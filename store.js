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
  tokensArray: ['oil1', 'oil1', 'oil2', 'con'],
  stagedToken: 'oil1',
  movesRemaining: 180,
  score: 0,
  bankBalance:  0,
  phase: 1,
  nextGoal: 125000,
  message: 'Click any unoccupied square in the grid to place the next item. Match 3 to make more valuable items.',
  electedOffice: 'State Delegate',
  megaPossCoords: [],
  megaPossTokens: [],
  trigger: 160,
  newMessage: true,
  porkOn: []
};

QuidStore.setupBoard = function () {
  var rows = currentState.board.rows,
    columns = currentState.board.columns,
    startingTokens = ['oil1', 'oil1', 'oil1', 'oil1', 'oil2', 'con', 'oil2', 'oil3', 'oil1', 'oil1', 'oil2'],
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

QuidStore.completeMove = function(rowPos, colPos){
  var token = currentState.stagedToken,
    moves = currentState.movesRemaining,
    progressionData;

  if (token === 'mega'){
    token = this.convertMega(rowPos, colPos);
  } else if (token === 'pork'){
    currentState.porkOn.push( JSON.stringify([rowPos, colPos]) );
    console.log(currentState.porkOn);
  }
  token = this.handleMatches(token, rowPos, colPos);
  currentState.board.grid[rowPos][colPos] = token;
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

  if (this.isGameOver()){
    this.endGame('board');
  } else {
    this.moveConstituents(rowPos, colPos);
    this.setNextToken();
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
      if (token !== '' && token !== 'con' && token.slice(3) !== '5'){
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

QuidStore.moveConstituents = function(rowPos, colPos) {
  var currentConsCoords = this.findTokenCoords('con'),
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
    valStrings = [];

  currentState.stagedToken = tokens[Math.floor(Math.random() * tokens.length)];

  if (currentState.stagedToken === 'mega'){
    this.checkMegaValid();
    if (currentState.megaPossCoords.length === 0) {
      this.setNextToken();
    }
  }
};

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
