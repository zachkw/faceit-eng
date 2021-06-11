import { ActionType, getType, Reducer } from 'typesafe-actions';
import * as actions from '../actions';
import { TournamentState } from '../types';

const initialState: TournamentState = {
  loadingTournaments: false
};

export const tournaments: Reducer<
  TournamentState,
  ActionType<typeof actions>
> = (state: TournamentState = initialState, action) => {
  switch (action.type) {
    case getType(actions.FETCH_TOURNAMENTS.request):
      return { loadingTournaments: true };
    case getType(actions.FETCH_TOURNAMENTS.success):
      return {
        ...state,
        loadingTournaments: false,
        tournaments: Object.fromEntries(
          action.payload.map(tournament => [tournament.id, tournament])
        )
      };
    case getType(actions.FETCH_TOURNAMENTS.failure):
      return { ...state, loadingTournaments: false, searchError: true };
    default:
      return state;
  }
};
