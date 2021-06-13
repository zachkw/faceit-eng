import React, { useCallback, useEffect, useState } from 'react';
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
  selectTournamentLoading,
  selectTournamentSearchError
} from './selectors/tournaments';
import { useCallbackState, useSelector } from './hooks/hooks';
import { ResultsTextContainer } from './components/ResultsTextContainer';
import { ADD_TOURNAMENT, FETCH_TOURNAMENTS } from './actions';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useCallbackState<string | undefined>(
    undefined,
    (value: string | undefined) => {
      dispatch(FETCH_TOURNAMENTS.request(value));
    },
    250
  );

  const tournamentIds = useSelector(selectTournamentIds);
  const loadingTournaments = useSelector(selectTournamentLoading);
  const searchError = useSelector(selectTournamentSearchError);

  const tournamentsSearchText = loadingTournaments
    ? 'Loading Tournaments...'
    : searchError
    ? 'Something unexpected went wrong.'
    : 'No Tournaments Found.';

  const handleCreateTournament = () => {
    const enteredTournamentName = prompt('Please enter tournament name');
    if (enteredTournamentName) {
      dispatch(ADD_TOURNAMENT.request(enteredTournamentName));
    }
  };

  const retryFetchTournaments = useCallback(() => {
    dispatch(FETCH_TOURNAMENTS.request(search));
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(FETCH_TOURNAMENTS.request(search));
  }, [dispatch, search]);

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <HeaderContainer>
        <Input
          onChange={event =>
            setSearch(event.target.value ? event.target.value : undefined)
          }
          placeholder={'Search Tournament...'}
        ></Input>
        <Button onClick={handleCreateTournament}>Create Tournament</Button>
      </HeaderContainer>
      {!loadingTournaments && tournamentIds?.length ? (
        <TournamentCardsContainer>
          {tournamentIds.map(id => (
            <TournamentCard id={id} />
          ))}
        </TournamentCardsContainer>
      ) : (
        <ResultsTextContainer>
          {tournamentsSearchText}
          {searchError ?? (
            <Button onClick={retryFetchTournaments}>Retry</Button>
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
