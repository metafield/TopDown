class Rectangle {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public colour: string
    ) {}

    public collidesWithRect(other: Rectangle) {
        return this.x < other.x + other.width && this.x + this.width > other.x &&
               this.y < other.y + other.height && this.y + this.height > other.y
    }
}

export default Rectangle
