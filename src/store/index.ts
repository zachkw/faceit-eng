import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import { all } from 'redux-saga/effects';
import { tournamentSideEffects } from '../sagas/tournaments';

export const getComposeForEnvironment = (): typeof compose =>
  composeWithDevTools({});

const sagaMiddleware = createSagaMiddleware();

const composer = getComposeForEnvironment();

const store = createStore(
  rootReducer,
  composer(applyMiddleware(sagaMiddleware))
);

export function* rootSaga(): Generator {
  yield all(tournamentSideEffects);
}

sagaMiddleware.run(rootSaga);

export default store;
