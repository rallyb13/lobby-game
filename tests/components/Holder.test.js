import React from 'react';

import test from 'tape';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Holder from '../../components/Holder';
import Token from '../../components/Token';

test('Holder', (assert) => {
  const wrapper = shallow(<Holder />);
  assert.equal(wrapper.find(Token).length, 1);
  assert.end();
});

test('Holder#onClick', (assert) => {
  sinon.spy(Holder.prototype, 'toggleTokens');
  const wrapper = shallow(<Holder />);
  wrapper.find('div').simulate('click');
  // Y U NO TRUE?
  assert.equal(Holder.prototype.toggleTokens.calledOnce, false);
  Holder.prototype.toggleTokens.restore();

  assert.end();
});
