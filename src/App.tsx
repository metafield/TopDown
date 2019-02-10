import * as React from "react";
import "./App.css";
import FPSDisplay from "./components/FPSDisplay";
import Game from "./Game";

class App extends React.Component {
  public game: Game;

  constructor(props: {}) {
    super(props);

    this.game = new Game();
    this.game.start();
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Top Down</h1>
        </header>
        <hr/>
        <FPSDisplay />
      </div>
    );
  }
}

export default App;
