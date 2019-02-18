import FPScounter from './FPScounter'
import * as kd from 'keydrown'
import sheetPNG from '../assets/0x72_DungeonTilesetII_v1.3.png'
import { demon, floors } from './Atlas'
import Actor from './Actor';

class Game {
    private ctx: CanvasRenderingContext2D
    // private buffer: CanvasRenderingContext2D

    private deemo: Actor;
    private sheet = new Image()
    private background = new Image()

    private lastime: number = 0
    private time: number = 0


    constructor(public canvas: HTMLCanvasElement) {
        this.sheet.src = sheetPNG
        this.sheet.onload = () => this.start()        
    }

    private async start() {
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.deemo = new Actor('deemo', 0, 0, demon, 'idle')

        // init input
        kd.W.down(() => {
            this.deemo.y -= 2
            this.deemo.curAnim = 'run'
        });
        kd.A.down(() => {
            this.deemo.x -= 2
            this.deemo.curAnim = 'run'
        });
        kd.S.down(() => {
            this.deemo.y += 2
            this.deemo.curAnim = 'run'
        });
        kd.D.down(() => {
            this.deemo.x += 2
            this.deemo.curAnim = 'run'
        });

        // generate a random background
        this.generateBackground(this.ctx)

        this.tick()
    }

    private async tick() {
        this.deemo.curAnim = 'idle'
        kd.tick() // update input
        this.lastime = this.time
        this.time = performance.now()
        const delta = this.time - this.lastime
        
        FPScounter.StopAndPost()
        FPScounter.startCounter()
        this.render(delta, this.ctx)
        
        requestAnimationFrame(() => this.tick())
    }

    private render(dt: number, ctx: CanvasRenderingContext2D) {
        // clear the canvas
        // ctx.clearRect(0, 0, 800, 600)
        // ctx.fillStyle = 'rgb(255, 0, 0)'
        // ctx.fillRect(0,0,800,600)

        this.drawBackground(this.ctx)
        this.drawActors(dt)
    }

    private generateBackground(ctx: CanvasRenderingContext2D) {
        // draw background
        const w = 16
        const h = 16
        const scale = 3;
        for (let loopX = 0; loopX < 20; loopX++) {
            for (let loopY = 0; loopY < 20; loopY++) {
                const randoTile = Math.floor(Math.random() * 3)
                
                ctx.drawImage(this.sheet, 
                    floors[randoTile].x, floors[randoTile].y, w, h, // img source
                    (w - 1) * loopX * scale, // canvas destination x | -1 because we are zero based and width isn't
                    (h - 1) * loopY * scale, // canvas destination y | -1 because we are zero based and height isn't
                    w * scale,
                    h * scale)
            }
        }

        this.background.src = ctx.canvas.toDataURL()
    }

    private drawBackground(ctx: CanvasRenderingContext2D) {
        // draw background
        ctx.drawImage(this.background, 0, 0)
    }

    private drawActors(dt: number) {
        this.deemo.draw(dt);
        const { curAnimFrame, curAnim, sprites } = this.deemo.getAnimationState()
        const { x, y, w, h } = sprites[curAnim]
        const sx = curAnimFrame * 32 + x

        this.ctx.drawImage(this.sheet, sx, y, w, h, this.deemo.x, this.deemo.y, w, h)
    }
}

export default Game
