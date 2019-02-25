import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Creators as ActionsAgenda } from 'ducks/Agenda';
import 'styles/App.css';

import Button from '@material-ui/core/Button';
import Pomodoro from 'components/Pomodoro';

import ModalSelecionarLista from 'components/SelecionarLista/Modal';
class PomodoroTela extends Component {
	state = {
		open: false
	};
	UNSAFE_componentWillMount() {
		setInterval(() => this.props.getAgendas(), 10000);
	}
	handleClickButton = () => {
		this.setState({ open: true });
	};
	handleModalFechar = () => {
		this.setState({ open: false });
	};
	render() {
		const { item, lista, selecionado } = this.props;
		const { open } = this.state;
		return (
			<div className="app" style={{ backgroundColor: item.cor }}>
				<Pomodoro agenda={lista.length > 0 ? lista[selecionado.index].horarios : []} />
				<Button style={{ color: '#fff' }} onClick={this.handleClickButton}>
					Editar
				</Button>
				<ModalSelecionarLista
					open={open}
					onFechar={this.handleModalFechar}
					dados={lista}
					selecionado={selecionado}
				/>
			</div>
		);
	}
}
const mapStateTopProps = ({ agenda, config }) => {
	const { lista, item } = agenda;
	const { selecionado } = config;
	return {
		lista,
		item,
		selecionado
	};
};
const { getAgendas, setItem } = ActionsAgenda;
export default connect(mapStateTopProps, { getAgendas })(PomodoroTela);
