import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ApiService } from '../services/ApiService';
import { NavigationService } from '../services/NavigationService';
import { HelperService } from '../services/HelperService';
import { Logger } from '../services/Logger';
import { IRootState, IEpicDependencies } from './rootState';
import { authState } from './auth';
import { coreState } from './core';
import { userState } from './user';
import { productsState } from './products';

const rootEpic = combineEpics<any>(...authState.epics, ...coreState.epics, ...userState.epics, ...productsState.epics);

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    apiService: new ApiService(),   
    navigationService: new NavigationService(),
    helperService: HelperService,
    logger: Logger
  } as IEpicDependencies
});

const withDevtools = composeWithDevTools({ maxAge: 20, shouldCatchErrors: true });

const store: Store = createStore<IRootState, any, any, any>(
  combineReducers({
    auth: authState.reducer,
    user: userState.reducer,
    products: productsState.reducer
  }),
  withDevtools(applyMiddleware(epicMiddleware))
);

export { store };

epicMiddleware.run(rootEpic);
