import * as React from 'react'
import './App.css'

import { observable, when } from 'mobx'
import FPSDisplay from './components/FPSDisplay'
import Game from './game/Game'
import Store from './store/Store'
import { observer } from 'mobx-react';

@observer
class App extends React.Component {
    
    @observable
    public canvas: any = React.createRef()
    public game: Game

    private store = new Store()

    constructor(props: {}) {
        super(props)

        // wait for the canvas ref to be established and then pass it to the Game Controller
        when(() => this.canvas.current !== null).then(() => {
            this.game = new Game(this.canvas.current, this.store)
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
                <p>Speed X: {this.store.deemoSpeed.x}</p>
                <p>Speed Y: {this.store.deemoSpeed.y}</p>

            </div>
        )
    }
}

export default App
