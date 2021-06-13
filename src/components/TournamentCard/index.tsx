import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DELETE_TOURNAMENT, EDIT_TOURNAMENT_NAME } from '../../actions';
import { useSelector } from '../../hooks/hooks';
import { editTournamentNameSaga } from '../../sagas/tournaments';
import { selectTournamentById } from '../../selectors/tournaments';
import H6 from '../H6';
import Button from './Button';
import { ButtonContainer } from './ButtonContainer';
import { Container } from './Container';
import H7 from './H7';

export const TournamentCard: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();

  const tournamentDetails = useSelector(state =>
    selectTournamentById(state, id)
  );

  const deleteTournament = useCallback(() => {
    dispatch(DELETE_TOURNAMENT.request({ id: id }));
  }, [dispatch, id]);

  const editTournamentName = useCallback(() => {
    const enteredTournamentName = prompt('New Tournament Name:');
    if (enteredTournamentName) {
      dispatch(
        EDIT_TOURNAMENT_NAME.request({ id: id, name: enteredTournamentName })
      );
    }
  }, [dispatch, id]);

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
        <Button onClick={editTournamentName}>Edit</Button>
        <Button onClick={deleteTournament}>Delete</Button>
      </ButtonContainer>
    </Container>
  );
};
