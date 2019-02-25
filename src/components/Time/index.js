import React from 'react';
import Tipo from 'components/Tipo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Time extends React.Component {
	twoDigits(num) {
		return num > 9 ? '' + num : '0' + num;
	}

	convertToHhMmSs(seconds) {
		const h = this.twoDigits(Math.floor(seconds / 3600));
		const m = this.twoDigits(Math.floor((seconds % 3600) / 60));
		const s = this.twoDigits(Math.floor((seconds % 3600) % 60));
		return `${h}:${m}:${s}`;
	}

	render() {
		var remainingTime = this.convertToHhMmSs(this.props.seconds);
		const {item}  = this.props;
		document.title = item.texto + ' - ' + remainingTime;
		
		return (
			<div className="timer">
				
				<div className="timer-icone">
					<FontAwesomeIcon icon={item.icon} size="2x" />
				</div>
				<p className="timer__description">{item.texto}</p>
				<p className="timer__time">{remainingTime}</p>
			</div>
		);
	}
}
export default Time;
