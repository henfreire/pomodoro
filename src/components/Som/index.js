import React from 'react';
import somBreak from 'sons/super-mario-2335.mp3';
import somFimBreak from 'sons/spongebob-end.mp3';
class Som extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			play: false,
			pause: true,
			timeOut: 3000,
			url: ''
		};
		this.audio = new Audio(somBreak);
	}

	UNSAFE_componentWillMount() {
		// const { tipo, play } = this.props;
		// if (play) {
		// 	this.atualizar({ tipo });
		// }
	}
	componentWillReceiveProps(nextProps) {
		// const { tipo, play } = nextProps;
		// if (play != this.props.play) {
		// 	if (play) {
		// 		this.atualizar({ tipo });
		// 	} else {
		// 		this.pause();
		// 	}
		// }
	}
	atualizar = ({ tipo, play }) => {
		const url = this.getAudio({ tipo });
		this.setState({ url, play });
		this.audio = new Audio(url);
		this.play();
		setTimeout(this.pause, this.state.timeOut);
	};
	getAudio = ({ tipo }) => {
		let som = '';
		switch (tipo) {
			case 'break':
				som = somBreak;
				break;
			case 'fimBreak':
				som = somFimBreak;
			default:
				som = somBreak;
				break;
		}
		return som;
	};
	play = () => {
		if (!this.state.play) {
			this.setState({ play: true, pause: false });
			this.audio.play();
		}
	};

	pause = () => {
		if (!this.state.pause) {
			this.setState({ play: false, pause: true });
			this.audio.pause();
		}
	};

	render() {
		return (
			<audio controls autoPlay>
				<source src={somBreak} />
			</audio>
		);
	}
}
export default Som;
