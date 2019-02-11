import { faUser } from '@fortawesome/free-solid-svg-icons';
import cor from 'components/Cores';
const TipoItem = ({ tipo }) => {
	const opcao = tipo;
	let dados = {};
	switch (opcao) {
		case 'workTime':
			dados = {
				icon: faUser,
				texto: 'Pomodoro',
				cor: cor.work
			};
			break;
		case 'break':
			dados = {
				icon: faUser,
				texto: 'Break',
				cor: cor.work
			};
			break;
		case 'cafe':
			dados = {
				icon: faUser,
				texto: 'Café',
				cor: cor.work
			};
			break;
		case 'almoco':
			dados = {
				icon: faUser,
				texto: 'Café',
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
