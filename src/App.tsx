import * as React from "react";
import "./App.css";
import FPSDisplay from "./components/FPSDisplay";
import Game from "./Game";

import { observable } from 'mobx';

class App extends React.Component {
  public game: Game;

  @observable
  public canvas:any = React.createRef()

  constructor(props: {}) {
    super(props);

    this.game = new Game(this.canvas);
    this.game.start();
    console.log(this.canvas.current)
  }

  // public componentDidMount() {
  //   setInterval(() => console.log(this.canvas),300)

  // }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Top Down</h1>
        </header>
        <hr/>
        <FPSDisplay />
        <canvas id='main-canvas' ref={this.canvas} width={800} height={600} />
      </div>
    );
  }
}

export default App;
