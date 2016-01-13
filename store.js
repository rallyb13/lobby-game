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
    columns = currentState.board.columns;

    for (var i=0; i < rows; i++) {
      var row = [];
      for (var j=0; j < columns; j++) {
        row.push('');
      }
      currentState.board.grid.push(row);
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

QuidStore.nextMove = function(rowPos, colPos){
  currentState.board.grid[rowPos][colPos] = currentState.stagedToken;
  this.setNextToken();
  this.emitChange();
};

QuidStore.setNextToken = function(){
  var tokens = currentState.tokensArray;
  currentState.stagedToken = tokens[Math.floor(Math.random() * tokens.length)];
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
