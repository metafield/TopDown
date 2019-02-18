import FPScounter from './FPScounter'
import sheetPNG from '../assets/0x72_DungeonTilesetII_v1.3.png'
import { demon } from './Atlas'
import Actor from './Actor';

class Game {
    private ctx: CanvasRenderingContext2D
    // private buffer: CanvasRenderingContext2D

    private deemo: Actor;
    private sheet = new Image()

    private lastime: number = 0
    private time: number = 0


    constructor(public canvas: HTMLCanvasElement) {
        this.sheet.src = sheetPNG
    }

    public async start() {
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.deemo = new Actor('deemo', 0, 0, demon, 'idle')

        document.body.addEventListener('keydown', (e) => {
            if (e.code === 'KeyD' ) {
                this.deemo.curAnim = 'run';
                this.deemo.x += 6
            } else if(e.code === 'KeyA') {
                this.deemo.curAnim = 'run';
                this.deemo.x -= 6
            }
            console.log(e.code);
            
        })

        document.body.addEventListener('keyup', (e) => {
            if (e.code === 'KeyD' || e.code === 'KeyA' ) {
                this.deemo.curAnim = 'idle';
            }
            console.log(e.code);
            
        })

        this.tick()
    }

    private async tick() {
        this.lastime = this.time
        this.time = performance.now()
        const delta = this.time - this.lastime
        
        FPScounter.StopAndPost()
        FPScounter.startCounter()
        this.render(delta)
        
        requestAnimationFrame(() => this.tick())
    }

    private render(dt: number) {
        this.deemo.draw(this.ctx, this.sheet, dt);
        this.ctx.save()
        this.ctx.scale(3, .5);
        this.ctx.beginPath();
        this.ctx.arc(50, 50, 40, 0, 7);
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.restore()
    }
}

export default Game
