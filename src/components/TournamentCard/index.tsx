import React from 'react';
import { useSelector } from '../../hooks/hooks';
import { selectTournamentById } from '../../selectors/tournaments';
import H6 from '../H6';
import Button from './Button';
import { ButtonContainer } from './ButtonContainer';
import { Container } from './Container';
import H7 from './H7';

export const TournamentCard: React.FC<{ id: string }> = ({ id }) => {
  const tournamentDetails = useSelector(state =>
    selectTournamentById(state, id)
  );
  if (!tournamentDetails) {
    return null;
  }

  return (
    <Container>
      <H6>{tournamentDetails?.name}</H6>
      <H7>Organizer: {tournamentDetails.organizer}</H7>
      <H7>Game: {tournamentDetails.game}</H7>
      <H7>
        Participants: {tournamentDetails.participants.current}/
        {tournamentDetails.participants.max}
      </H7>
      <H7>Start: {tournamentDetails.startDate}</H7>
      <ButtonContainer>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </ButtonContainer>
    </Container>
  );
};
