import styled from 'styled-components';
import theme from '../theme';
import { Container } from './TournamentCard/Container';

export const TournamentCardsContainer = styled.div`
  margin-top: ${theme.spacing(6)};
  display: flex;
  flex-flow: row wrap;
`;
