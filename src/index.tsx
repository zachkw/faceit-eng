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
import {
  ADD_TOURNAMENT,
  DELETE_TOURNAMENT,
  EDIT_TOURNAMENT_NAME,
  FETCH_TOURNAMENTS
} from './actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  console.log('rerender');
  const [search, setSearch] = useCallbackState<string | undefined>(
    undefined,
    () => retryFetchTournaments(),
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
      dispatch(ADD_TOURNAMENT.request({ name: enteredTournamentName, search }));
    }
  };

  const retryFetchTournaments = useCallback(() => {
    dispatch(FETCH_TOURNAMENTS.request(search));
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(FETCH_TOURNAMENTS.request(undefined));
  }, [dispatch]);

  const deleteTournament = useCallback(
    (id: string) => {
      dispatch(DELETE_TOURNAMENT.request({ id, search }));
    },
    [dispatch, search]
  );

  const editTournamentName = useCallback(
    (id: string, name: string) => {
      const enteredTournamentName = prompt('New Tournament Name:');
      if (enteredTournamentName) {
        dispatch(EDIT_TOURNAMENT_NAME.request({ id, name, search }));
      }
    },
    [dispatch, search]
  );

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <HeaderContainer>
        <Input
          onChange={event =>
            setSearch(event.target.value ? event.target.value : undefined)
          }
          placeholder={'Search Tournament...'}
        />
        <Button onClick={handleCreateTournament}>Create Tournament</Button>
      </HeaderContainer>
      {!loadingTournaments && tournamentIds?.length ? (
        <TournamentCardsContainer>
          {tournamentIds.map(id => (
            <TournamentCard
              key={id}
              id={id}
              remove={deleteTournament}
              edit={editTournamentName}
            />
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
