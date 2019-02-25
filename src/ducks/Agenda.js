import { createActions, createReducer } from 'reduxsauce';
export const { Types, Creators } = createActions({
	getAgendas: [ 'payload' ],
	getAgendasSuces: [ 'payload' ],
	setItem: [ 'payload' ]
});
const INIT_STATE = {
	lista: [],
	item: {
		cor: '#ff6e0d'
	}
};

const getAgendasSuces = (state = INIT_STATE, action) => ({
	...state,
	lista: action.payload
});
const setItem = (state = INIT_STATE, action) => ({
	...state,
	item: action.payload

});

export default createReducer(INIT_STATE, {
	[Types.GET_AGENDAS_SUCES]: getAgendasSuces,
	[Types.SET_ITEM]: setItem
});
