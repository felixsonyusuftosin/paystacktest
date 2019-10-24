import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Home } from '@home'
import 'App.scss'

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="**">Not found</Route>
		</Switch>
	</Router>
)

export default hot(module)(App)
