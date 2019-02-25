import { createActions, createReducer } from 'reduxsauce';
export const { Types, Creators } = createActions({
	setAuthMensagem: [ 'payload' ],
	setUsuario: [ 'payload' ],
	criarConta: [ 'payload' ],
	setLoaderAuth: [ 'payload' ],
	login: [ 'payload' ],
    logout: [ 'payload' ],
    loginSucesso: [ 'payload' ],
	logoutSucesso: [ 'payload' ]
});
const INIT_STATE = {
	authMensagem: '',
	exibirAuthMensagem: false,
	authLoader: false,
    usuario: null,
    initURL: '',
};
const setMensagem = (state = INIT_STATE, action) => {
    const { mensagem, mostrar } = action.payload;
	return {
		...state,
		authMensagem: mensagem ? mensagem : '',
		exibirAuthMensagem: typeof mostrar === 'boolean' ? mostrar : false
	};
};
const setDadosUsuario = (state = INIT_STATE, action) => ({
	...state,
    usuario: action.payload
});
const loginSucesso = (state = INIT_STATE, action) => {
	let usuario = action.payload.user;
    usuario ={
        ...usuario,
    }
    return {
        ...state,
        usuario: usuario,
        authLoader: false
    }
}
const logoutSucesso = (state = INIT_STATE, action) => ({
	...state,
    usuario: null,
    authLoader: false
});
const authLoader = (state = INIT_STATE, action) => ({
	...state,
	authLoader: action.payload
});
export default createReducer(INIT_STATE, {
	[Types.SET_AUTH_MENSAGEM]: setMensagem,
	[Types.SET_USUARIO]: setDadosUsuario,
	[Types.LOGIN_SUCESSO]: loginSucesso,
	[Types.LOGOUT_SUCESSO]: logoutSucesso,
	[Types.SET_LOADER_AUTH]: authLoader
});
