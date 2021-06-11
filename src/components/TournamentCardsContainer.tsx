import styled from 'styled-components';
import theme from '../theme';

export const TournamentCardsContainer = styled.div`
  margin-top: ${theme.spacing(6)};
  display: flex;
  flex-flow: row wrap;
  *:last-child {
    margin-right: 0;
  }
`;
