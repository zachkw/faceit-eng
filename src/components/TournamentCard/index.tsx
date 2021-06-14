import React, { useCallback } from 'react';
import { useSelector } from '../../hooks/hooks';
import { selectTournamentById } from '../../selectors/tournaments';
import H6 from '../H6';
import Button from './Button';
import { ButtonContainer } from './ButtonContainer';
import { Container } from './Container';
import H7 from './H7';
import { format } from 'date-fns';

export interface TournamentCardProps {
  id: string;
  remove: (id: string) => void;
  edit: (id: string, name: string) => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  id,
  edit,
  remove
}) => {
  const tournamentDetails = useSelector(state =>
    selectTournamentById(state, id)
  );

  const deleteTournament = useCallback(() => {
    remove(id);
  }, [id, remove]);

  const editTournamentName = useCallback(() => {
    const enteredTournamentName = prompt('New Tournament Name:');
    if (enteredTournamentName) {
      edit(id, enteredTournamentName);
    }
  }, [edit, id]);

  if (!tournamentDetails) {
    return null;
  }

  const startDate = format(
    new Date(tournamentDetails.startDate),
    'dd/MM/yyyy HH:mm:ss'
  );

  return (
    <Container>
      <H6>{tournamentDetails?.name}</H6>
      <H7>Organizer: {tournamentDetails.organizer}</H7>
      <H7>Game: {tournamentDetails.game}</H7>
      <H7>
        Participants: {tournamentDetails.participants.current}/
        {tournamentDetails.participants.max}
      </H7>
      <H7>Start: {startDate}</H7>
      <ButtonContainer>
        <Button onClick={editTournamentName}>Edit</Button>
        <Button onClick={deleteTournament}>Delete</Button>
      </ButtonContainer>
    </Container>
  );
};
