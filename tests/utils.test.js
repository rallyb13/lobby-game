import test from 'tape';

import Utils from '../utils';

test('Utils#setElectedOffice', (assert) => {
  // w/ bad phase
  let currentOffice = 'current office'
  let office = Utils.setElectedOffice('aaa', currentOffice);
  assert.equal(office, currentOffice);

  // w/ good phase
  office = Utils.setElectedOffice(8, currentOffice);
  assert.equal(office, 'State Senator');
  assert.end();
});

test('Utils#setElectionChoice', (assert) => {
  // w/ bad phase
  let choice = Utils.setElectionChoice('aaa');
  assert.equal(choice, 'none');

  // w/ good phase
  choice = Utils.setElectionChoice(13);
  assert.equal(choice, 'Want to go to DC now? The US Congress awaits...');
  assert.end();
});

test('Utils#formatNum', (assert) => {
  assert.equal(Utils.formatNum(999), '999');
  assert.equal(Utils.formatNum(1999), '1,999');
  assert.equal(Utils.formatNum(100999), '100,999');
  assert.equal(Utils.formatNum(111222999), '111,222,999');
  assert.end();
})
