import {expect, test, vi} from 'vitest';
import {reduxtron} from '../src';

// TODO: Remove this workaround after unplugin-auto-expose will be fixed for ESM support
vi.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: () => {},
  },
  ipcRenderer: {
    send: vi.fn(),
    invoke: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  },
}));

test('reduxtron', async () => {
  expect(reduxtron.dispatch).toBeTypeOf('function');
  expect(reduxtron.getState).toBeTypeOf('function');
  expect(reduxtron.subscribe).toBeTypeOf('function');
});
