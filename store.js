var EventEmitter = require('events').EventEmitter;
var QuidStore = new EventEmitter();
var CHANGE_EVENT = 'change';
var currentState = {
  board: {
    rows: 6,
    columns: 6,
    grid: []
  },
  tokensArray: ['a', 'a', 'b', 'c'],
  stagedToken: 'a',
  movesRemaining: 730,
  score: 0,
  bankBalance:  0,
  gamePhase: 1,
  nextGoal: 0,
  message: '',
  electedOffice: ''
};

QuidStore.setupBoard = function () {
  var rows = currentState.board.rows,
    columns = currentState.board.columns,
    startingTokens = ['a', 'a', 'a', 'a', 'a', 'b', 'b', 'c'];

    for (var i=0; i < rows; i++) {
      var row = [];
      for (var j=0; j < columns; j++) {
        row.push('');
      }
      currentState.board.grid.push(row);
    }

    // go though starting tokens and put the values on the board
    for (var i=0; i < startingTokens.length; i++) {
      var x = Math.floor(Math.random() * 5),
        y = Math.floor(Math.random() * 5);
        currentState.board.grid[x][y] = startingTokens[i];
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

QuidStore.checkEmpty = function(rowPos, colPos){
  return currentState.board.grid[rowPos][colPos] === '';
};

QuidStore.completeMove = function(rowPos, colPos){
  var playedToken = currentState.stagedToken;
  playedToken = this.handleMatches(playedToken, rowPos, colPos);
  currentState.board.grid[rowPos][colPos] = playedToken;
  this.setNextToken();
  this.emitChange();
};

QuidStore.setNextToken = function(){
  var tokens = currentState.tokensArray;
  currentState.stagedToken = tokens[Math.floor(Math.random() * tokens.length)];
};

QuidStore.handleMatches = function(token, rowPos, colPos){
  var matchCoords = this.cardinalCheck(token, rowPos, colPos),
    moreCoords = [],
    toAddCoords = [];

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

  if (matchCoords.length >= 2){
    this.clearMatches(matchCoords);
    token = this.promoteToken(token);
  }

  return token;
};

QuidStore.cardinalCheck = function(token, rowPos, colPos){
  var possibleMatches = [ [rowPos, colPos+1], [rowPos, colPos-1], [rowPos+1, colPos], [rowPos-1, colPos]],
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

QuidStore.clearMatches = function(matches){
  for (var i = 0; i < matches.length; i++){
    currentState.board.grid[matches[i][0]][matches[i][1]] = '';
  }
}

QuidStore.promoteToken = function(token){
  var tokenMap = {
    'a': 'b',
    'b': 'c',
    'c': 'final'
  }
  return tokenMap[token];
};

QuidStore.setNextGoal = function() {
  var goalMap = {
        1: 125000,
        2: 75000,
        3: 100000
      };
  currentState.nextGoal = goalMap[currentState.gamePhase];
};

QuidStore.setMessage = function() {
  var gamePhase = currentState.gamePhase,
      nextGoal = currentState.nextGoal,
      movesRemaining = currentState.movesRemaining,
      messageMap = {
        1: 'Congrats on your election. Now raise some money.'
        // 1: 'You need to raise $' + nextGoal + ' in ' + movesRemaining 'days in order to win re-election!',
        // 2: 'Primary challenger! You need $' + nextGoal + ' in only ' + movesRemaining + ' days.',
        // 3: 'You survived your primary. Hope you can still raise $' + nextGoal + ' in the ' + movesRemaining + 'days.'
      };
  currentState.message = messageMap[gamePhase];
};

QuidStore.setElectedOffice = function() {
  var electedOfficeMap = {
        1: 'State Delegate',
        2: 'State Delegate',
        3: 'State Delegate'
      };
  currentState.electedOffice = electedOfficeMap[currentState.gamePhase];
};

export default QuidStore;
