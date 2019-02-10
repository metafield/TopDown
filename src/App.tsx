import * as React from 'react';
import './App.css';
import FPS from './components/FPS';
import Game from './Game';
import logo from './logo.svg';

class App extends React.Component {
  public game: Game;

  constructor(props: {}) {
    super(props)

    this.game = new Game()
    this.game.start()
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <FPS />
        <p className="App-intro"> intro
        </p>
      </div>
    );
  }
}

export default App;
