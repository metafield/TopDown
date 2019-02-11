
import { when } from 'mobx';

import FPScounter from './FPScounter'

class Game  {
    private ctx: CanvasRenderingContext2D;

    constructor(public canvas:any){}

    public async start() {
        await when(() => this.canvas !== null)
        this.ctx = this.canvas.current.getContext('2d');
        const ctx = this.ctx

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
        
        this.tick()
    }
    
    private sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    
    private async tick() {
        FPScounter.startCounter()
        await this.sleep(15);
        FPScounter.StopAndPost()
        requestAnimationFrame(() => this.tick())
    }
}

export default Game