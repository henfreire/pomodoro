import Tipo from 'components/Tipo';
import {iconeSquad} from 'components/Logo';
export const setMensagem = ({ tipo}) => {
    const item = Tipo({tipo});
	new Notification(item.texto, {
		icon: iconeSquad,
        lang: 'pt-br',
	});
};
