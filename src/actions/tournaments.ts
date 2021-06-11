import { createAsyncAction } from 'typesafe-actions';

export interface TournamentFilter {}

export const FETCH_TOURNAMENTS = createAsyncAction(
  '@TOURNAMENTS/FETCH_REQUEST',
  '@TOURNAMENTS/FETCH_SUCCESS',
  '@TOURNAMENTS/FETCH_FAILURE'
)<TournamentFilter | undefined, void, void>();

export const ADD_TOURNAMENT = createAsyncAction(
  '@TOURNAMENTS/ADD_REQUEST',
  '@TOURNAMENTS/ADD_SUCCESS',
  '@TOURNAMENTS/ADD_FAILURE'
)<TournamentFilter, void, void>();

export const EDIT_TOURNAMENT_NAME = createAsyncAction(
  '@TOURNAMENTS/EDIT_NAME_REQUEST',
  '@TOURNAMENTS/EDIT_NAME_SUCCESS',
  '@TOURNAMENTS/EDIT_NAME_FAILURE'
)<TournamentFilter, void, void>();

export const DELETE_TOURNAMENT = createAsyncAction(
  '@TOURNAMENTS/DELETE_REQUEST',
  '@TOURNAMENTS/DELETE_SUCCESS',
  '@TOURNAMENTS/DELETE_FAILURE'
)<TournamentFilter, void, void>();
