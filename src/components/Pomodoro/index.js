import React from 'react';
import { logoWebBranca } from 'components/Logo';
import Time from 'components/Time';
import { tipoSom } from 'components/Som/Audio';
import Som from 'components/Som';
import { setMensagem } from 'components/Notificacao';
import moment from 'moment';
import agenda from 'config/agenda';
import Tipo from 'components/Tipo';
const Logo = () => <img className="icon icons8-Tomato" src={logoWebBranca} />;

class Pomodoro extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			break: 600,
			workTime: 3000,
			cafe: 1200,
			somFile: '',
			playSom: false,
			almoco: 3600,
			seconds: 3000,
			timerId: false,
			pomodoro: 1,
			active: '',
			agenda: agenda,
			item: {}
		};

		this.playStop = this.playStop.bind(this);
		this.updateTime = this.updateTime.bind(this);
	}
	UNSAFE_componentWillMount() {
		Notification.requestPermission();
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
				time = currentState.seconds - 1;
			}
			if (currentState.active != res.tipo) {
				this.notificar({ tipo: res.tipo });
			}
			currentState.seconds = time;
			currentState.active = nextTimer;

			if (this.timerID) {
				currentState.timerId = this.timerID;
			}
			return currentState;
		});
	}

	notificar = ({ tipo }) => {
		const item = Tipo({tipo});
		const fileSom = tipoSom({ tipo });
		this.setState({ fileSom, playSom: true });
		setTimeout(() => this.setState({ playSom: false, item }), 4000);
		setMensagem({ tipo });
	};
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

	handleSongLoading = () => {};
	handleSongPlaying = () => {};
	handleSongFinishedPlaying = () => {};
	render() {
		const buttonString = this.state.timerId ? 'Pausar' : 'Iniciar';
		const { playSom, somFile, active, seconds, item } = this.state;
		return (
			<div className="app" style={{backgroundColor: item.cor}}>
				<Logo />
				<Time active={active} seconds={seconds} />
				<Button action={this.playStop}>{buttonString}</Button>
				{playSom && <Som file={somFile} tipo={active} />}
			</div>
		);
	}
}

const Button = (props) => (
	<button className="btn" onClick={props.action}>
		{props.children}
	</button>
);

export default Pomodoro;
