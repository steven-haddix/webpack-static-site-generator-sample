import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { Router, RouterContext, match, createMemoryHistory, browserHistory } from 'react-router'

import template from './template'
import routes from './routes'

if (typeof document !== 'undefined') {
    const outlet = document.getElementById('outlet');
    ReactDOM.render(<Router history={browserHistory} routes={routes} />, outlet);
}

export default function(page, callback) {
    const history = createMemoryHistory();
    const location = history.createLocation(page);

    match({
        routes: routes,
        location: location
    }, function (error, redirectLocation, renderProps) {
        const appElement = (
            <RouterContext
                {...renderProps}
                createElement={(Component, props) => {
                    return <Component {...props} />;
                }}
            />
        );
        const component = ReactDOMServer.renderToString(appElement);
        const style = page.assets.style.replace('.js', '.css');
        console.log(page)
        callback(null, template(
            component,
            `/${page.assets.app}`,
            `/${page.assets.manifest}`,
            `/${page.assets.vendor}`,
            style)
        )
    })
}
