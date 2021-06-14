import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';
import { State, TournamentDetails, TournamentState } from '../types';

export const selectTournamentsState = (state: State): TournamentState => {
  return state.tournaments;
};

export const selectTournamentLoading = createSelector(
  selectTournamentsState,
  (tournamentsState: TournamentState): boolean =>
    tournamentsState.loadingTournaments
);

export const selectTournamentSearchError = createSelector(
  selectTournamentsState,
  (tournamentsState: TournamentState): boolean =>
    tournamentsState.searchError ?? false
);

export const selectTournamentIds = createSelector(
  selectTournamentsState,
  (tournamentsState: TournamentState): string[] | undefined => {
    return tournamentsState?.tournaments
      ? Object.keys(tournamentsState.tournaments)
      : undefined;
  }
);

export const selectTournamentById = createCachedSelector(
  selectTournamentsState,
  (_: State, id: string) => id,
  (state: TournamentState, id: string): TournamentDetails | undefined => {
    return state.tournaments ? state.tournaments[id] : undefined;
  }
)((_: State, id: string) => id);
