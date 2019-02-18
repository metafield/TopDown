class Actor {
    // tracks animation progress in ms. When the animation is over, reset this to 0
    private animProgressMs = 0
    private curAnimFrame = 0
    // private timeAlive = 0

    constructor(
        public name: string,
        public x: number,
        public y: number,
        public sprites: any,
        public curAnim: string
    ) {}

    public draw(ctx: CanvasRenderingContext2D, sheet: HTMLImageElement, dt: number) {
        // add dt to tracked time
        this.animProgressMs += dt
        // this.timeAlive += dt
        const msPerAnim = 60

        const newAnimFrame = Math.floor(this.animProgressMs / msPerAnim)
        
        // return if not enough time has passed for a new frame
        // console.log(this.curAnimFrame, newAnimFrame);
        
        if (this.curAnimFrame === newAnimFrame) { 
            return
        }
        this.curAnimFrame = newAnimFrame
        
        
        if (this.curAnimFrame >= this.sprites[this.curAnim].animLen) {
            this.curAnimFrame = 0
            this.animProgressMs = 0
            return
        }
        
        const { x, y, w, h } = this.sprites[this.curAnim]
        const sx = this.curAnimFrame * 32 + x

        ctx.clearRect(0, 0, 800, 600)
        ctx.save()
        ctx.scale(-2, 2)
        ctx.drawImage(sheet, sx, y, w, h, -200, 0, 128, 128)
        ctx.restore()


    }

    
}

export default Actor
