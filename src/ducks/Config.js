import { createActions, createReducer } from 'reduxsauce';
export const { Types, Creators } = createActions({
	setTipoSelecionado: [ 'payload' ],
	
});
const INIT_STATE = {
	selecionado: {
        index:0
    },
	
};

const setTipoSelecionado = (state = INIT_STATE, action) => ({
	...state,
	selecionado: action.payload
});


export default createReducer(INIT_STATE, {
	[Types.SET_TIPO_SELECIONADO]: setTipoSelecionado,
});
