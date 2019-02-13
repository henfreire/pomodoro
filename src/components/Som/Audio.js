import somBreak from 'sons/super-mario-2335.mp3';
import somFimBreak from 'sons/spongebob-end.mp3';
let audio = new Audio();
export const playSom = ({ tipo }) => {
	let som;
	if (tipo) {
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
		try {
			audio.src = som;
			audio.autoplay = true;
			audio.load();
			setTimeout(pausar, 3000);
			//window.audio = audio;

			// audio.addEventListener('oncanplay', () => {
			// 	let duration = audio.duration;
			// 	console.log("duration", duration)
			//   })
			// audio.oncanplay = () => {
			// 	audio.play();
			// 	setTimeout(pausar, 3000);
			// };
		} catch (err) {
			console.log('err', err);
		}
	}
};

export const play = () => {
	audio.play();
};
export const pausar = () => {
	audio.pause();
};
