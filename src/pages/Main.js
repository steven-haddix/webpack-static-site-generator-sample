import React from 'react'
import layout from './layout';

class Main extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

//export default layout(Main);
export default layout(Main);