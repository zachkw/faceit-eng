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
  searchError?: boolean;
  tournaments?: Record<string, TournamentDetails>;
}
