import { tournaments } from './reducers/tournaments';

export interface TournamentDetails {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
}

export interface TournamentState {
  loadingTournaments: boolean;
  searchError?: boolean;
  tournaments: Record<string, TournamentDetails>;
}

export interface State {
  tournaments: ReturnType<typeof tournaments>;
}
