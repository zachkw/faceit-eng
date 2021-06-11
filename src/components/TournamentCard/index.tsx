import React from 'react';
import H6 from '../H6';
import Button from './Button';
import { ButtonContainer } from './ButtonContainer';
import { Container } from './Container';
import H7 from './H7';

export interface TournamentCardProps {
  id: string;
  title: string;
  organizer: string;
  game: string;
  participants: string[];
  start: number;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  id,
  title,
  organizer,
  game,
  participants,
  start
}) => {
  return (
    <Container>
      <H6>{title}</H6>
      <H7>Organizer: {organizer}</H7>
      <H7>Game: {game}</H7>
      <H7>Participants: {participants.join(', ')}</H7>
      <H7>Start: {start}</H7>
      <ButtonContainer>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </ButtonContainer>
    </Container>
  );
};
