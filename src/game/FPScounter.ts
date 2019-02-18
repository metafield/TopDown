import { observable } from 'mobx'

class FPScounter {
    @observable
    public static fps: number = 0
    public static delta: number = 0

    // Start counting fps
    public static startCounter(): void {
        // get the current time
        this.startTime = performance.now()
    }

    // stop the counter and display the results
    public static StopAndPost() {
        // get the current time
        FPScounter.endTime = performance.now()

        // grab the delta here 1ms is min
        const delta = FPScounter.endTime - FPScounter.startTime
        FPScounter.delta = delta > 0 ? delta : 1



        // add delta to the frame times
        FPScounter.frameTimes += FPScounter.delta

        // count a frame
        ++FPScounter.frames

        // if 1sec has passed then
        if (FPScounter.frameTimes >= 1000) {
            // set the results and reset tracking vars
            FPScounter.fps = FPScounter.frames
            FPScounter.frames = 0
            FPScounter.frameTimes = 0
        }
    }

    private static startTime: number
    private static endTime: number
    private static frameTimes: number = 0
    private static frames: number = 0
}

export default FPScounter
