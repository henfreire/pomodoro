import React, { Component } from 'react';
import { logoWebBranca } from 'components/Logo';
import Time from 'components/Time';
const Logo = () => <img className="icon icons8-Tomato" src={logoWebBranca} />;

class Pomodoro extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			break: 600,
			workTime: 3000,
			cafe: 1200,
			almoco: 3600,
			seconds: 0,
			timerId: false,
			pomodoro: 1,
			active: 'workTime',
			almocoTime: { start: '12:00', end: '13:00' },
			cafeTime: [ { start: '18:00', end: '19:00' } ],
			breakTime: [ { start: '19:20', end: '19:25' } ]
		};

		this.playStop = this.playStop.bind(this);
		this.updateTime = this.updateTime.bind(this);
	}

	//
	updateTime() {
		this.setState(function(prevState, props) {
			const currentState = Object.assign(prevState);
			const stillActive = prevState.seconds - 1 > 0;
			let nextTimer = 'workTime';
			if (this.verificarCafe()) {
				nextTimer = 'cafe';
			} else if (this.verificarAlmoco()) {
				nextTimer = 'almoco';
			} else if (this.verificarBreak()) {
				nextTimer = 'break';
			} else {
				nextTimer = 'workTime';
			}
			currentState.seconds = stillActive ? currentState.seconds - 1 : currentState[nextTimer];
			currentState.active = stillActive ? currentState.active : nextTimer;

			if (this.timerID) {
				currentState.timerId = this.timerID;
			}
			return currentState;
		});
	}
	verificarAlmoco = () => {
		const { almocoTime } = this.state;
		let timeAtual = new Date(new Date().getTime()).toLocaleTimeString('pt-BR');
		if (timeAtual >= almocoTime.start && timeAtual <= almocoTime.end) {
			return true;
		}
		return false;
	};
	verificarCafe = () => {
		const { cafeTime } = this.state;
		let item = {};
		let timeAtual = new Date(new Date().getTime()).toLocaleTimeString('pt-BR');
		let resposta = false;
		for (let i = 0; i < cafeTime.length; i++) {
			item = cafeTime[i];
			if (timeAtual >= item.start && timeAtual <= item.end) {
				resposta = true;
				break;
			}
		}
		return resposta;
	};
	verificarBreak = () => {
		const { breakTime } = this.state;
		let item = {};
		let timeAtual = new Date(new Date().getTime()).toLocaleTimeString('pt-BR');
		let resposta = false;
		for (let i = 0; i < breakTime.length; i++) {
			item = breakTime[i];
			if (timeAtual >= item.start && timeAtual <= item.end) {
				resposta = true;
				break;
			}
		}
		return resposta;
	};
	//
	playStop() {
		if (this.state.timerId) {
			clearInterval(this.state.timerId);
			return this.setState({
				seconds: this.state.workTime,
				timerId: false,
				active: 'workTime'
			});
		}

		this.timerID = setInterval(() => this.updateTime(), 1000);
	}
	componentDidMount() {
		this.updateTime();
		this.playStop();
	}
	//
	updateLength(timer, e) {
		if (this.state.timerId) {
			return false;
		}

		const state = Object.assign({}, this.state);
		state[timer] = e.target.value * 60;
		state.seconds = timer === 'workTime' ? e.target.value * 60 : state.seconds;
		this.setState(state);
	}
	render() {
		const buttonString = this.state.timerId ? 'Pausar' : 'Começar';
		return (
			<div className="app">
				<Logo />
				<Time active={this.state.active} seconds={this.state.seconds} />
				<Button action={this.playStop}>{buttonString}</Button>
				{/* <Option value={this.state.workTime} timer="workTime" updateLength={this.updateLength.bind(this)}>
					Minutes of work
				</Option>
				<Option value={this.state.breakTime} timer="breakTime" updateLength={this.updateLength.bind(this)}>
					Minutes of break
				</Option> */}
			</div>
		);
	}
}

// class Option extends React.Component {
// 	onChange(e) {
// 		e.preventDefault();
// 		this.props.updateLength(this.props.timer, e);
// 	}

// 	convertToMinutes(seconds) {
// 		return Math.floor(seconds / 60);
// 	}

// 	render() {
// 		return (
// 			<label className="input-group">
// 				{this.props.children}
// 				<input
// 					className="input-group__input"
// 					type="number"
// 					min="1"
// 					step="1"
// 					placeholder="Insert minutes"
// 					onChange={this.onChange.bind(this)}
// 					value={this.convertToMinutes(this.props.value)}
// 				/>
// 			</label>
// 		);
// 	}
// }

const Button = (props) => (
	<button className="btn" onClick={props.action}>
		{props.children}
	</button>
);



export default Pomodoro;
