import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Pomodoro from './routes/Pomodoro';
import 'styles/App.css';
class App extends Component {
	render() {
		return (
			<Switch>
				<Route path="/" component={Pomodoro} />
			</Switch>
		);
	}
}

export default App;
