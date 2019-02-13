import React from 'react';
import somBreak from 'sons/super-mario-2335.mp3';
import somFimBreak from 'sons/spongebob-end.mp3';
import { tipoSom } from 'components/Som/Audio';
class Som extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { file, tipo } = this.props;
		const som = tipoSom({tipo});
		return <embed src={som} autostart="true" width="0" height="0" id="beep" enablejavascript="true" />;
	}
}
export default Som;
