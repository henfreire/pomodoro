import React from 'react';
import somBreak from 'sons/super-mario-2335.mp3';
import somFimBreak from 'sons/spongebob-end.mp3';
class Som extends React.Component {
	state = { audio: new Audio() };
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
	pausar = () => {
		this.state.audio.pause();
	};
	play = () => {
		this.state.audio.play();
	};
	componentDidMount() {
		this.playSom({ tipo: this.props.tipo });
	}
	
	render() {
		const { audio } = this.props;

		return <div />;
	}
}
export default Som;
