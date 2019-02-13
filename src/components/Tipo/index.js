import { faUser, faCoffee, faLaptopCode, faFutbol, faUtensils, faUsers, faHourglassEnd, faSmileBeam, faSadCry } from '@fortawesome/free-solid-svg-icons';

import cor from 'components/Cores';
const TipoItem = ({ tipo }) => {
	const opcao = tipo;
	let dados = {};
	switch (opcao) {
		case 'workTime':
			dados = {
				icon: faLaptopCode,
				texto: 'Pomodoro',
				cor: cor.work
			};
			break;
		case 'break':
			dados = {
				icon: faSmileBeam,
				texto: 'Break',
				cor: cor.break
			};
			break;
		case 'cafe':
			dados = {
				icon: faCoffee,
				texto: 'Café',
				cor: cor.work
			};
			break;
		case 'almoco':
			dados = {
				icon: faUtensils,
				texto: 'Almoço',
				cor: cor.work
			};
			break;
		case 'sprint':
			dados = {
				icon: faUsers,
				texto: 'Sprint',
				cor: cor.sprint
			};
			break;
		case 'breakFinal':
			dados = {
				icon: faHourglassEnd,
				texto: 'Fim do expediente!!!',
				cor: cor.work
			};
			break;
		case 'fimBreak':
			dados = {
				icon: faSadCry,
				texto: 'Acabou o Break!!!',
				cor: cor.work
			};
			break;
		default:
			dados = {
				icon: faUser,
				texto: 'Não definido',
				cor: cor.work
			};
			break;
	}
	return dados;
};
export default TipoItem;
