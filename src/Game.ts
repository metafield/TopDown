import FPScounter from './FPScounter'
import sheetPNG from './assets/0x72_DungeonTilesetII_v1.2.png'

class Game {
    private ctx: CanvasRenderingContext2D
    private sheet = new Image()

    private demonAnimTracker = 0

    constructor(public canvas: HTMLCanvasElement) {
        this.sheet.src = sheetPNG
    }

    public async start() {
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        const ctx = this.ctx

        ctx.fillStyle = 'rgb(200, 0, 0)'
        ctx.fillRect(10, 10, 50, 50)

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
        ctx.fillRect(30, 30, 50, 50)

        this.tick()
    }

    private sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    private async tick() {
        FPScounter.startCounter()
        this.render(FPScounter.delta)
        await this.sleep(3)
        FPScounter.StopAndPost()
        requestAnimationFrame(() => this.tick())
    }

    private render(dt: number) {
        this.drawDemon(dt)
    }

    private drawDemon(dt: number) {
        const bigDemonRunAnim = {
            x: 144,
            y: 364,
            w: 32,
            h: 36,
            animLen: 4,
            isAnim: true,
        }

        // add dt to tracked time
        this.demonAnimTracker += dt
        const msPerAnim = 30
        const rawFrame = Math.floor(this.demonAnimTracker / msPerAnim)

        let curFrame = rawFrame

        if (rawFrame >= bigDemonRunAnim.animLen) {
            curFrame = 1
            this.demonAnimTracker = 0
        }

        const { x, y, w, h } = bigDemonRunAnim
        console.log(curFrame)

        const ctx = this.ctx
        const sx = curFrame * 32 + x
        ctx.clearRect(0, 0, 600, 800)
        ctx.drawImage(this.sheet, sx, y, w, h, 0, 0, w, h)
    }
}

export default Game
