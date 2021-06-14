import { call, put, takeEvery, select } from 'typed-redux-saga';
import {
  ADD_TOURNAMENT,
  DELETE_TOURNAMENT,
  EDIT_TOURNAMENT_NAME,
  FETCH_TOURNAMENTS
} from '../actions/tournaments';
import fetch, { Response } from 'cross-fetch';
import {
  API_TOURNAMENTS_URL_PATCH,
  API_TOURNAMENTS_URL,
  API_TOURNAMENTS_URL_QUERY
} from '../constants/api';
import { TournamentDetails } from '../types';
import { selectSearchText } from '../selectors/tournaments';
import { takeLatest } from 'redux-saga/effects';

const headers = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json'
});

export function* fetchTournamentsSaga(
  action?: ReturnType<typeof FETCH_TOURNAMENTS.request>
): Generator {
  try {
    const searchText: string = action?.payload
      ? action.payload
      : ((yield select(selectSearchText)) as string | undefined) || '';

    const res: Response = (yield call(
      fetch,
      API_TOURNAMENTS_URL_QUERY(searchText)
    )) as Response;
    if (res.status >= 400) {
      throw new Error();
    }
    const tournaments = (yield call([res, res['json']])) as TournamentDetails[];
    yield put(FETCH_TOURNAMENTS.success(tournaments));
  } catch (err) {
    yield put(FETCH_TOURNAMENTS.failure());
  }
}

export function* addTournamentSaga(
  action: ReturnType<typeof ADD_TOURNAMENT.request>
): Generator {
  try {
    const res = (yield call(fetch, API_TOURNAMENTS_URL, {
      method: 'post',
      headers,
      body: JSON.stringify({ name: action.payload })
    })) as Response;

    if (res.status >= 400) {
      throw new Error();
    }
    const tournament = (yield call([res, res['json']])) as TournamentDetails;

    yield put(ADD_TOURNAMENT.success(tournament));
    yield call(fetchTournamentsSaga);
  } catch {
    yield put(ADD_TOURNAMENT.failure());
  }
}

export function* editTournamentNameSaga(
  action: ReturnType<typeof EDIT_TOURNAMENT_NAME.request>
): Generator {
  try {
    const res: Response = (yield call(
      fetch,
      API_TOURNAMENTS_URL_PATCH(action.payload.id),
      {
        method: 'patch',
        headers,
        body: JSON.stringify({ name: action.payload.name })
      }
    )) as Response;

    if (res.status >= 400) {
      throw new Error();
    }
    yield put(EDIT_TOURNAMENT_NAME.success());
    yield call(fetchTournamentsSaga);
  } catch {
    yield put(EDIT_TOURNAMENT_NAME.failure());
  }
}

export function* deleteTournamentSaga(
  action: ReturnType<typeof DELETE_TOURNAMENT.request>
): Generator {
  try {
    const res: Response = (yield call(
      fetch,
      API_TOURNAMENTS_URL_PATCH(action.payload.id),
      {
        method: 'delete',
        headers
      }
    )) as Response;
    if (res.status >= 400) {
      throw new Error();
    }
    yield put(DELETE_TOURNAMENT.success());
    yield call(fetchTournamentsSaga);
  } catch {
    yield put(DELETE_TOURNAMENT.failure());
  }
}

export const tournamentSideEffects = [
  takeLatest(FETCH_TOURNAMENTS.request, fetchTournamentsSaga),
  takeEvery(ADD_TOURNAMENT.request, addTournamentSaga),
  takeEvery(EDIT_TOURNAMENT_NAME.request, editTournamentNameSaga),
  takeEvery(DELETE_TOURNAMENT.request, deleteTournamentSaga)
];
