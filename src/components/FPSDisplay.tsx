import * as React from 'react';
import FPScounter from '../FPScounter';

import { observer } from 'mobx-react';

@observer
class FPSDisplay extends React.Component {
    public render() {
        return <React.Fragment>
        <p>{FPScounter.fps}fps</p>
    </React.Fragment>
    }
}

export default FPSDisplay;