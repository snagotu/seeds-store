import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';

import { IEpicDependencies } from '../rootState';
import { productsGetEpicGetTodoList } from './epics';
import { getDeps } from '../../../test/epicDependencies';
import { getProducts_1, getInitialState } from '../../../test/entities';
import { coreState } from '../core';
import { ActionType, actions } from './actions';

describe('user epics', () => {
  let deps: IEpicDependencies;
  let error;
  let state$;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
    state$ = { value: getInitialState() };
  });

  describe('todoGetEpicGetTodoList', () => {
    const query = { page: 1, limit: 1 };
    it('should get epic for get user list', done => {
      const emitedActions = [];
      productsGetEpicGetTodoList(ActionsObservable.of(actions.setListStart(query)), state$, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === ActionType.SET_LIST_SUCCESS) {
          expect(deps.apiService.getProductsList).toBeCalledWith(query);
          expect(emitedActions[0]).toEqual(actions.setListSuccess([getProducts_1()]));
          done();
        }
      });
    });

    it('should catch errors and dispatch them to the user error handler', done => {
      const emitedActions = [];
      deps.apiService.getProductsList = () => throwError(error);
      productsGetEpicGetTodoList(ActionsObservable.of(actions.setListStart({ page: 1, limit: 1 })), state$, deps).subscribe(output => {
        emitedActions.push(output);
        expect(emitedActions[0]).toEqual(coreState.actions.epicError(error));
        done();
      });
    });
  });
});
