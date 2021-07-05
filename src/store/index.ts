import { combineReducers } from 'redux';
import { personReducers } from './PersonReducers';

export const rootReducer = combineReducers({
  personState: personReducers,
});

export type RootState = ReturnType<typeof rootReducer>;