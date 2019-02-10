import * as React from 'react';
import FPScounter from '../FPScounter'

const FPS = () => <React.Fragment>
    <p>{FPScounter.fps}</p>
</React.Fragment>

export default FPS;