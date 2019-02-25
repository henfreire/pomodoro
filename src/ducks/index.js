import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { connectRouter } from 'connected-react-router';

import storage from 'redux-persist/lib/storage';
import Auth from './Auth';
import Agenda from './Agenda';
import Config from './Config';

const authPersistConfig = {
	key: 'auth',
	storage: storage,
	whitelist: [ 'usuario' ]
};
const agendaPersistConfig = {
	key: 'agenda',
	storage: storage,
	whitelist: [ 'lista' ]
};
const configPersistConfig = {
	key: 'config',
	storage: storage,
	whitelist: [  'selecionado']
};
export default (history) =>
	combineReducers({
		router: connectRouter(history),
		auth: persistReducer(authPersistConfig, Auth),
		agenda: persistReducer(agendaPersistConfig, Agenda),
		config: persistReducer(configPersistConfig, Config)
	});
