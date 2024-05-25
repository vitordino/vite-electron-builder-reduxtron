import {mount} from '@vue/test-utils';
import {expect, test, vi} from 'vitest';
import {counterReducer} from '../../shared/reducers/counter';
import ReactiveCounter from '../src/components/ReactiveCounter.vue';

const state = {counter: 0};

let callback: ((state: unknown) => void) | null = null;
const getState = vi.fn(() => Promise.resolve(state));
const subscribe = vi.fn(cb => {
  callback = cb;
  cb(state);
});
const dispatch = vi.fn(action => {
  state.counter = counterReducer(state.counter, action);
  callback?.(state);
});

// @ts-expect-error is not picking preload.d.ts
window.__electron_preload__reduxtron = {subscribe, getState, dispatch};

test('ReactiveHash component', async () => {
  expect(ReactiveCounter).toBeTruthy();
  const wrapper = mount(ReactiveCounter);

  const button = wrapper.get('button');

  // expect(button.text()).toBe('count is: 0');
  await button.trigger('click');
  expect(button.text()).toBe('count is: 1');
  await button.trigger('click');
  expect(button.text()).toBe('count is: 2');
});
