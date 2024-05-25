import type {ElectronApplication, JSHandle} from 'playwright';
import {_electron as electron} from 'playwright';
import {afterAll, beforeAll, expect, test} from 'vitest';
import type {BrowserWindow} from 'electron';

let electronApp: ElectronApplication;

beforeAll(async () => {
  electronApp = await electron.launch({args: ['.']});
});

afterAll(async () => {
  await electronApp.close();
});

test('Main window state', async () => {
  console.log('start');
  const page = await electronApp.firstWindow();
  console.log('await electronApp.firstWindow');
  const window: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
  console.log('await electronApp.browserWindow(page)');
  const windowState = await window.evaluate(
    (mainWindow): Promise<{isVisible: boolean; isDevToolsOpened: boolean; isCrashed: boolean}> => {
      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise(resolve => {
        /**
         * The main window is created hidden, and is shown only when it is ready.
         * See {@link ../packages/main/src/mainWindow.ts} function
         */
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else mainWindow.once('ready-to-show', () => resolve(getState()));
      });
    },
  );

  console.log('await window.evaluate');

  expect(windowState.isCrashed, 'The app has crashed').toBeFalsy();
  expect(windowState.isVisible, 'The main window was not visible').toBeTruthy();
  expect(windowState.isDevToolsOpened, 'The DevTools panel was open').toBeFalsy();
});

test('reduxtron counter', async () => {
  const page = await electronApp.firstWindow();
  const button = page.getByRole('button');
  expect(
    await button.textContent(),
    'expect find one element input#reactive-hash-raw-value',
  ).toEqual('count is: 0');
  await button.click({noWaitAfter: true});
  expect(
    await button.textContent(),
    'expect find one element input#reactive-hash-raw-value',
  ).toEqual('count is: 1');
  await button.click({noWaitAfter: true});
  expect(
    await button.textContent(),
    'expect find one element input#reactive-hash-raw-value',
  ).toEqual('count is: 2');
});
