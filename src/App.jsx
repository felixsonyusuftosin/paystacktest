import React from 'react'
import { hot } from 'react-hot-loader'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { Home } from '@home'
import 'App.scss'

const App = () => (
  <Router>
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="**">Not found</Route>
		</Switch>
	</Router>
)

export default hot(module)(App)
