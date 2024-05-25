import type {PreloadReduxBridgeReturn} from 'reduxtron/preload';
import type {State, Action} from '../shared/reducers';

declare global {
  interface Window {
    __electron_preload__reduxtron: PreloadReduxBridgeReturn<State, Action>['handlers'];
  }
}

export {};
