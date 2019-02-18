const demon = {
    idle: {
        x: 16,
        y: 364,
        w: 32,
        h: 36,
        animLen: 4,
        isAnim: true,
    },
    run: {
        x: 144,
        y: 364,
        w: 32,
        h: 36,
        animLen: 4,
        isAnim: true,
    },
}

const floors = [
    {
        x: 16,
        y: 64,
        w: 16,
        h: 16,
    },
    {
        x: 32,
        y: 64,
        w: 16,
        h: 16,
    },
    {
        x: 48,
        y: 64,
        w: 16,
        h: 16,
    },
]

export { demon, floors }