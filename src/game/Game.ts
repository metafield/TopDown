import FPScounter from './FPScounter'
import * as kd from 'keydrown'
import input from './Input'
import sheetPNG from '../assets/0x72_DungeonTilesetII_v1.3.png'
import { demon, floors } from './Atlas'
import Actor from './Actor';
import Store from 'src/store/Store';
import Rectangle from './Rectangle';

class Game {
    private ctx: CanvasRenderingContext2D
    // private buffer: CanvasRenderingContext2D

    private deemo: Actor;
    private sheet = new Image()
    private background = new Image()

    private lastime: number = 0
    private time: number = 0


    private mousePos = {
        x: 0,
        y: 0
    }

    constructor(public canvas: HTMLCanvasElement, public store: Store) {
        this.sheet.src = sheetPNG
        this.sheet.onload = () => this.start()        
    }

    private async start() {
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.deemo = new Actor(this, 'deemo', 0, 0, demon, 'idle')
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e), false);

        // init input Down
        kd.W.down(() => {
            input.vertical = -1
        });
        kd.A.down(() => {
            input.horizontal = -1
        });
        kd.S.down(() => {
            input.vertical = 1
        });
        kd.D.down(() => {
            input.horizontal = 1
        });

        // init input Up
        kd.W.up(() => {
            input.vertical = 0
        });
        kd.A.up(() => {
            input.horizontal = 0
        });
        kd.S.up(() => {
            input.vertical = 0
        });
        kd.D.up(() => {
            input.horizontal = 0
        });

        // generate a random background
        this.generateBackground(this.ctx)

        setTimeout(() => {
            // const gamepads = navigator.getGamepads()
            const gp = navigator.getGamepads()[0];
            if (gp) {
                console.log(JSON.stringify(gp.buttons, undefined, 2));
            }
            
        }, 1000);

        this.tick()
    }

    private async tick() {
        const gp = navigator.getGamepads()[0];
        if (gp) {
            const deadzone = 0.1
            const button = gp.buttons[0]
            const rawX = gp.axes[0]
            const rawY = gp.axes[1]

            input.horizontal = Math.abs(rawX) < deadzone ? 0 : rawX
            input.vertical = Math.abs(rawY) < deadzone ? 0 : rawY

            if (button.pressed) {
                console.log("Button pressed!");
            } else {
                console.log("Button not pressed");
            }
        }
        kd.tick() // update input
        this.lastime = this.time
        this.time = performance.now()
        const delta = this.time - this.lastime
        
        FPScounter.StopAndPost()
        FPScounter.startCounter()
        this.update(delta)
        this.render(delta, this.ctx, this.canvas)
        
        requestAnimationFrame(() => this.tick())
    }

    private update(delta: number) {
        this.deemo.update(delta)
    }

    private render(dt: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const { mousePos } = this
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawBackground(ctx)
        this.drawActors(dt)

        const red = 'rgb(255, 0 , 0)'
        const blue = 'rgb(0, 0 , 255)'
        const green = 'rgb(0, 255 , 0)'
        const weird = 'rgb(255, 255, 255)'

        const mouseRect = new Rectangle(mousePos.x, mousePos.y, 100, 100, red) 
        const rect1 = new Rectangle(10, 200, 100, 100, blue)
        const rect2 = new Rectangle(500, 500, 100, 100, green)

        const rects = [mouseRect, rect1, rect2]

        rects.forEach( (rect, i) => {
            ctx.fillStyle = rect.collidesWithRect(mouseRect) && i !== 0 ? weird : rect.colour
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
        })
    }

    private handleMouseMove(e: any) {
        this.mousePos = this.getMousePos(this.canvas, e);
    }
    
    private getMousePos(canvas: HTMLCanvasElement, evt: any) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
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
        const { curAnimFrame, curAnim, sprites } = this.deemo.getAnimationState()
        const { x, y, w, h } = sprites[curAnim]
        const sx = curAnimFrame * 32 + x

        this.ctx.drawImage(this.sheet, sx, y, w, h, this.deemo.x, this.deemo.y, w, h)
    }
}

export default Game
