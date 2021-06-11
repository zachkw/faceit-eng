import React, { useEffect } from 'react';
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
import { FETCH_TOURNAMENTS } from './actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FETCH_TOURNAMENTS.request(undefined));
  }, []);

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <HeaderContainer>
        <Input value="Search Tournament..."></Input>
        <Button onClick={() => console.log('hi')}>Create Tournament</Button>
      </HeaderContainer>
      <TournamentCardsContainer>
        <TournamentCard
          id="123"
          title="Tournament A"
          game="Rocket League"
          organizer="Tim Burton"
          participants={['Zach', 'Mike']}
          start={1000000}
        />
        <TournamentCard
          id="123"
          title="Tournament A"
          game="Rocket League"
          organizer="Tim Burton"
          participants={['Zach', 'Mike']}
          start={1000000}
        />
        <TournamentCard
          id="123"
          title="Tournament A"
          game="Rocket League"
          organizer="Tim Burton"
          participants={['Zach', 'Mike']}
          start={1000000}
        />
      </TournamentCardsContainer>
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
