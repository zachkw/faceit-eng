import styled from 'styled-components';
import theme from '../theme';

export const TournamentCardsContainer = styled.div`
  max-width: 960px;
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-flow: row wrap;
  *:last-child {
    margin-right: 0;
  }
`;
