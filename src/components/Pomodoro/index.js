import React from 'react';
import { logoWebBranca } from 'components/Logo';
import Time from 'components/Time';
import Som from 'components/Som';
import moment from 'moment';
window.moment = moment;

const Logo = () => <img className="icon icons8-Tomato" src={logoWebBranca} />;

class Pomodoro extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			break: 600,
			workTime: 3000,
			cafe: 1200,
			almoco: 3600,
			seconds: 3000,
			timerId: false,
			pomodoro: 1,
			active: 'workTime',
			agenda: [
				{ start: '08:00', end: '08:50', tipo: 'workTime' },
				{ start: '08:50', end: '09:10', tipo: 'cafe' },
				{ start: '09:10', end: '10:00', tipo: 'workTime' },
				{ start: '10:00', end: '10:10', tipo: 'break' },
				{ start: '10:10', end: '11:00', tipo: 'workTime' },
				{ start: '11:00', end: '11:10', tipo: 'break' },
				{ start: '11:10', end: '11:59', tipo: 'workTime' },
				{ start: '12:00', end: '13:00', tipo: 'almoco' },
				{ start: '18:00', end: '19:00', tipo: 'cafe' }
			]
		};

		this.playStop = this.playStop.bind(this);
		this.updateTime = this.updateTime.bind(this);
	}
	UNSAFE_componentWillMount() {
		this.iniciar();
	}
	iniciar = () => {
		this.updateTime();
		this.playStop();
	};

	checkStartTime = (dados) => {
		let start = moment.utc(moment().format('HH:mm:ss'), 'HH:mm:ss');
		let end = moment.utc(dados.end, 'HH:mm:ss');
		// evita erro de ser meia noite ou a end time ser maior
		if (end.isBefore(start)) {
			end.add(1, 'day');
		}
		let time = end.diff(start);
		return time * 0.001;
	};
	//
	updateTime() {
		this.setState(function(prevState, props) {
			const currentState = Object.assign(prevState);
			const stillActive = prevState.seconds - 1 > 0;
			let nextTimer = 'workTime';
			let time = currentState.seconds;
			let res = this.verificarAgenda();
			if (res.status) {
				nextTimer = res.tipo;
				time = this.checkStartTime(res);
			} else {
				nextTimer = 'workTime';
				time = currentState[nextTimer];
			}
			currentState.seconds = time;
			currentState.active = nextTimer;

			if (this.timerID) {
				currentState.timerId = this.timerID;
			}
			return currentState;
		});
	}

	verificarAgenda = () => {
		const { agenda } = this.state;
		let item = {};
		let timeAtual = new Date(new Date().getTime()).toLocaleTimeString('pt-BR');
		let resposta = { status: false };
		for (let i = 0; i < agenda.length; i++) {
			item = agenda[i];
			if (timeAtual >= item.start && timeAtual <= item.end) {
				resposta = { ...item, status: true };
				break;
			}
		}
		return resposta;
	};
	//
	playStop() {
		if (this.state.timerId) {
			clearInterval(this.state.timerId);
			this.updateTime();
			return this.setState({
				timerId: false
			});
		}

		this.timerID = setInterval(() => this.updateTime(), 1000);
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
	playSom = ({ tipo }) => {
		let som;
		switch (tipo) {
			case 'break':
				som = somBreak;
				break;
			case 'fimBreak':
				som = somFimBreak;
		}
		let audio = new Audio(som);
		this.setState({ audio });
		this.state.audio.play();
		setTimeout(this.pausar(), 300);
	};
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
