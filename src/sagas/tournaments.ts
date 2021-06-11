import { call, put, select, takeEvery } from 'typed-redux-saga';
import {
  ADD_TOURNAMENT,
  DELETE_TOURNAMENT,
  EDIT_TOURNAMENT_NAME,
  FETCH_TOURNAMENTS
} from '../actions/tournaments';
import fetch, { Response } from 'cross-fetch';
import { API_TOURNAMENTS_URL } from '../constants/api';

const headers = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json'
});

export function* fetchTournamentsSaga(
  action: ReturnType<typeof FETCH_TOURNAMENTS.request>
): Generator {
  try {
    const res: Response = (yield call(fetch, API_TOURNAMENTS_URL)) as Response;
    console.log(res);
    if (res.status >= 400) {
      throw new Error();
    }
    yield put(FETCH_TOURNAMENTS.success());
  } catch (err) {
    console.log(err);
    yield put(FETCH_TOURNAMENTS.failure());
  }
}

export function* addTournamentSaga(
  action: ReturnType<typeof ADD_TOURNAMENT.request>
): Generator {
  try {
  } catch {}
}

export function* editTournamentNameSaga(
  action: ReturnType<typeof EDIT_TOURNAMENT_NAME.request>
): Generator {
  try {
  } catch {}
}

export function* deleteTournamentSaga(
  action: ReturnType<typeof DELETE_TOURNAMENT.request>
): Generator {
  try {
  } catch {}
}

export const tournamentSideEffects = [
  takeEvery(FETCH_TOURNAMENTS.request, fetchTournamentsSaga),
  takeEvery(ADD_TOURNAMENT.request, addTournamentSaga),
  takeEvery(EDIT_TOURNAMENT_NAME.request, editTournamentNameSaga),
  takeEvery(DELETE_TOURNAMENT.request, deleteTournamentSaga)
];
