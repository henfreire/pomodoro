import somBreak from 'sons/super-mario-2335.mp3';
import somFimBreak from 'sons/spongebob-end.mp3';
import somDefault from 'sons/calm-1ost-minecraft.mp3';
export const tipoSom = ({ tipo }) => {
	let som;
	if (tipo) {
		switch (tipo) {
			case 'break':
				som = somBreak;
				break;
			case 'fimBreak':
				som = somFimBreak;
			case 'almocao':
				som = somBreak;
			default:
				som = somDefault;
				break;
		}

		return som;
	}
};
