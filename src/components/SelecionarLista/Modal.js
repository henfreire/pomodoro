import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Card from './Card';
import CardSelecionado from './CardSelecionado';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { Creators as ActionsConfig } from 'ducks/Config';
class ResponsiveDialog extends React.Component {
	state = {
		open: false
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.onFechar && this.props.onFechar();
	};
	handleClickCard = ({ index }) => {
		const { lista } = this.props;
		this.props.setTipoSelecionado({ ...lista[index], index });
	};

	render() {
		const { fullScreen, open, dados, selecionado } = this.props;

		return (
			<div>
				<Dialog
					fullScreen={fullScreen}
					open={open}
					onClose={this.handleClose}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">{'Selecione o tipo de horário usar'}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{dados.map(
								(item, index) =>
									selecionado.index == index ? (
										<CardSelecionado index dados={item} index={index} />
									) : (
										<Card index dados={item} index={index} onClickCard={this.handleClickCard} />
									)
							)}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Fechar
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

ResponsiveDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired
};

const mapStateTopProps = ({ agenda }) => {
	const { lista } = agenda;
	return { lista };
};
const { setTipoSelecionado } = ActionsConfig;
export default compose(withMobileDialog(), connect(mapStateTopProps, {setTipoSelecionado}))(ResponsiveDialog);
