import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

import Main from './pages/Main'
import Home from './pages/Home'

export default (
    <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path='*' component={Home} />
    </Route>
)