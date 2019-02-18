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

    public getAnimationState() {
        const {curAnim, curAnimFrame, sprites} = this
        
        return {curAnim, curAnimFrame, sprites}
    }

    public draw(dt: number) {
        // add dt to tracked time
        this.animProgressMs += dt
        // this.timeAlive += dt
        const msPerAnim = 100

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
    }

    
}

export default Actor
