import {configureStore} from '@reduxjs/toolkit';

import type {State, Action, Store} from '../../shared/reducers';
import {reducer} from '../../shared/reducers';

// @ts-expect-error ignore for now
export const store: Store = configureStore<State, Action>({reducer});
