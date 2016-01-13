var EventEmitter = require('events').EventEmitter;
var QuidStore = new EventEmitter();
var CHANGE_EVENT = 'change';
var currentState = {
  tokensArray: ['a', 'a', 'b', 'c'],
  stagedToken: Math.floor(Math.random() * tokensArray.length),
  movesRemaining: 730,
  score: 0,
  bankBalance:  0,
  gamePhase: 1,
  nextGoal: QuidStore.getNextGoal(this.gamePhase),
  message: QuidStore.getMessage(this.gamePhase, this.nextGoal, this.movesRemaining),
  electedOffice: QuidStore.getElectedOffice(this.gamePhase)
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

QuidStore.getNextGoal = function(gamePhase) {
  var goalMap = {
    1: 125000,
    2: 75000,
    3: 100000
  }
  return goalMap[gamePhase];
};

QuidStore.getMessage = function(gamePhase, nextGoal, movesRemaining) {
  var messageMap = {
    1: 'You need to raise $' + nextGoal + ' in ' + movesRemaining 'days in order to win re-election!',
    2: 'Primary challenger! You need $' + nextGoal + ' in only ' + movesRemaining + ' days.',
    3: 'You survived your primary. Hope you can still raise $' + nextGoal + ' in the ' + movesRemaining + 'days.'
  }
  return messageMap[gamePhase];
};

QuidStore.getElectedOffice = function(gamePhase) {
  var electedOfficeMap = {
    1: 'State Delegate',
    2: 'State Delegate',
    3: 'State Delegate'
  }
  return electedOfficeMap[gamePhase];
};
