import React from 'react'

/**
 * Layout Container
 *
 * Note usage of Higher-Order Composition pattern instead of extending from React.createClass
 * http://egorsmirnov.me/2015/09/30/react-and-es6-part4.html
 */
const wrapInLayout = ComposedComponent => class extends React.Component {
    render() {
        return (
            <div>

                <div>Header</div>

                <ComposedComponent {...this.props}  />

                <div>Footer</div>
            </div>
        )
    }
};


const wrapper = ComposedComponent => {
    return wrapInLayout(ComposedComponent)
};

export default wrapper;
