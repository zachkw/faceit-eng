import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';
import { State, TournamentDetails, TournamentState } from '../types';

export const selectTournamentsState = (state: State): TournamentState => {
  return state.tournaments;
};

export const selectTournamentLoading = (state: State): boolean => {
  return state.tournaments.loadingTournaments;
};

export const selectTournamentSearchError = (state: State): boolean => {
  return state.tournaments.searchError ? state.tournaments.searchError : false;
};

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
