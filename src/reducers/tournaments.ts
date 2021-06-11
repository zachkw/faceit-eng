import { ActionType, getType, Reducer } from 'typesafe-actions';
import * as actions from '../actions';
import { TournamentState } from '../types';

const initialState: TournamentState = {};

export const tournaments: Reducer<
  TournamentState,
  ActionType<typeof actions>
> = (state: TournamentState = initialState, action) => {
  switch (action.type) {
    case getType(actions.FETCH_TOURNAMENTS.request):
      return { ...state, searchError: false, tournaments: {} };
    case getType(actions.FETCH_TOURNAMENTS.success):
      return { ...state, tournaments: {} };
    case getType(actions.FETCH_TOURNAMENTS.failure):
      return { ...state, searchError: true };
    default:
      return state;
  }
};
