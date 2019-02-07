import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Aplicacao from './app/';
class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header" />
				<Aplicacao />
			</div>
		);
	}
}

export default App;
