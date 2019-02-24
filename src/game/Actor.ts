import input from './Input';

class Actor {
    // tracks animation progress in ms. When the animation is over, reset this to 0
    private animProgressMs = 0
    private curAnimFrame = 0
    private timeAlive = 0
    private moveSpeed = 0.2


    constructor(
        public name: string,
        public x: number,
        public y: number,
        public sprites: any,
        public curAnim: string
    ) {
        setInterval(
            () => console.log(`I have been alive for ${this.timeAlive} ms`),
            10000
        )
    }
    

    public getAnimationState() {
        const { curAnim, curAnimFrame, sprites } = this

        return { curAnim, curAnimFrame, sprites }
    }

    public update(dt: number) {
        // handle animation for inputs by player ( using the input layer over keydrown)
        const { horizontal, vertical } = input
        this.curAnim = (horizontal || vertical) ? 'run' : 'idle'

        const vectorX = Math.floor(dt * this.moveSpeed * horizontal)
        const vectorY = Math.floor(dt * this.moveSpeed * vertical)

        this.x += vectorX
        this.y += vectorY
        
        // add dt to tracked time
        this.animProgressMs += dt
        this.timeAlive += dt
        const msPerAnim = 100

        const newAnimFrame = Math.floor(this.animProgressMs / msPerAnim)

        // return if not enough time has passed for a new frame
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
