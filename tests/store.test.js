import test from 'tape';
import sinon from 'sinon';

import QuidStore from '../store';

test('QuidStore - default state', (assert) => {
  QuidStore.setupBoard();

  let state = QuidStore.getCurrentState();
  assert.equal(state.board.columns, 6);
  assert.equal(state.board.rows, 6);
  assert.equal(Object.keys(state.board.grid).length, 6);

  assert.end();
});

test('QuidStore#setAndgetToken', (assert) => {

  QuidStore.setupBoard();

  let tokenValue = 'tokenValue';
  QuidStore.setToken(tokenValue, 0, 0);
  let token = QuidStore.getToken(0, 0);

  assert.equal(token, tokenValue);

  assert.end();

});

test('QuidStore#deposit', (assert) => {
  QuidStore.setupBoard();

  let state = QuidStore.getCurrentState();
  assert.equal(state.bankBalance, 0);

  QuidStore.deposit(88);
  assert.equal(state.bankBalance, 88);

  assert.end();
});

test('QuidStore#score', (assert) => {
  QuidStore.setupBoard();

  let state = QuidStore.getCurrentState();
  assert.equal(state.score, 0);

  QuidStore.score(8);
  assert.equal(state.score, 8);


  assert.end();
});

test('QuidStore.changeHelperCount', (assert) => {
  QuidStore.setupBoard();
  QuidStore.emitChange = sinon.spy();

  let state = QuidStore.getCurrentState();
  assert.deepEqual(state.helpers, {'oil6': 0, 'agr6': 0, 'mil6': 0, 'fin6': 0, 'con2': 1, 'con3': 0, 'con5': 0 });

  QuidStore.changeHelperCount('oil6');
  assert.equal(state.helpers['oil6'], 1);
  assert.equal(QuidStore.emitChange.called, true);

  QuidStore.changeHelperCount('oil6', true);
  assert.equal(state.helpers['oil6'], 0);
  assert.equal(QuidStore.emitChange.called, true);

  assert.end();
});

test('QuidStore#rerunPhase', (assert) => {
  QuidStore.setupBoard();

  let state = QuidStore.getCurrentState();
  assert.equal(state.repeat, 0);
  QuidStore.rerunPhase(true);
  assert.equal(state.repeat, 1);
  QuidStore.rerunPhase(true);
  assert.equal(state.repeat, 2);
  QuidStore.rerunPhase();
  assert.equal(state.repeat, 0);
  assert.end();
});
