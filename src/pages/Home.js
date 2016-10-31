import React from 'react'
import layout from './layout';

function getAttribute(name, attributes) {
    let value = ''

    attributes.forEach((attribute) => {
        if (attribute.name === name) {
            value = attribute.value;
        }
    })

    return value;
}

class Image extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.src} />
            </div>
        )
    }
}

class Home extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>this is the home page</p>
            </div>
        )
    }
}

export default Home;
