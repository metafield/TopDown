import FPScounter from './FPScounter'

class Game {
    public start() {
        this.tick()
    }
    
    public sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    
    public async tick() {
        FPScounter.startCounter()
        await this.sleep(15);
        FPScounter.StopAndPost()
        requestAnimationFrame(() => this.tick())
    }
}

export default Game