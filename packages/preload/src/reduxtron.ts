import {ipcRenderer} from 'electron';
import {preloadReduxBridge} from 'reduxtron/preload';

import type {State, Action} from '../../shared/reducers';

export const {handlers: reduxtron} = preloadReduxBridge<Partial<State>, Action>(ipcRenderer);
