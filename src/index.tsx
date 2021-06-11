import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/Container';
import H4 from './components/H4';
import Button from './components/Button';
import Input from './components/Input';
import HeaderContainer from './components/HeaderContainer';
import { TournamentCardsContainer } from './components/TournamentCardsContainer';
import { TournamentCard } from './components/TournamentCard';
import {
  selectTournamentIds,
  selectTournamentLoading
} from './selectors/tournaments';
import H6 from './components/H6';
import { useSelector } from './hooks/hooks';
import { ResultsTextContainer } from './components/ResultsTextContainer';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const tournamentIds = useSelector(selectTournamentIds);
  console.log(tournamentIds, 'ids');
  const loadingTournaments = useSelector(selectTournamentLoading);

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <HeaderContainer>
        <Input value="Search Tournament..."></Input>
        <Button onClick={() => console.log('hi')}>Create Tournament</Button>
      </HeaderContainer>
      {tournamentIds ? (
        <TournamentCardsContainer>
          {tournamentIds.map(id => (
            <TournamentCard id={id} />
          ))}
        </TournamentCardsContainer>
      ) : (
        <ResultsTextContainer>
          {loadingTournaments ? (
            <H6>Loading Tournaments...</H6>
          ) : (
            <H6>No tournaments found</H6>
          )}
        </ResultsTextContainer>
      )}
    </Container>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
