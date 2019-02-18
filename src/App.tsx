import * as React from 'react'
import './App.css'

import { observable, when } from 'mobx'
import FPSDisplay from './components/FPSDisplay'
import Game from './game/Game'

class App extends React.Component {
    public game: Game

    @observable
    public canvas: any = React.createRef()

    constructor(props: {}) {
        super(props)

        // wait for the canvas ref to be established and then pass it to the Game Controller
        when(() => this.canvas.current !== null).then(() => {
            this.game = new Game(this.canvas.current)
            this.game.start()
        })
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Top Down</h1>
                </header>
                <hr />
                <FPSDisplay />
                <canvas
                    id="main-canvas"
                    ref={this.canvas}
                    width={800}
                    height={600}
                />
            </div>
        )
    }
}

export default App
