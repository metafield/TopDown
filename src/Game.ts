
import { when } from 'mobx';

import FPScounter from './FPScounter'

class Game  {
    private ctx: CanvasRenderingContext2D;
    private startX: number = 10;
    private startY: number = 10;

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
        this.render()
        await this.sleep(3)
        FPScounter.StopAndPost()
        requestAnimationFrame(() => this.tick())
    }

    private render() {
        const ctx = this.ctx

        ctx.clearRect(0,0,800,600)


        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(this.startX, this.startY, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(this.startX + 20, this.startY + 20, 50, 50);

        this.startX++
        this.startY++
    }
}

export default Game