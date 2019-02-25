import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '../ducks/index';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
import { routerMiddleware } from 'connected-react-router';
import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const migrations = {
	7: (state) => {
		return {
			...state
		};
	}
};

const persistConfig = {
	key: 'pomodoroRoot',
	storage,
	version: 7,
	whitelist: ['settingss'],
	migrate: createMigrate(migrations, { debug: false })
};
const middlewares = [ sagaMiddleware, routeMiddleware ];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
	const persistedReducer = persistReducer(persistConfig, reducers(history));
	const store = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
	const persistor = persistStore(store);
	sagaMiddleware.run(rootSaga);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../ducks/index', () => {
			const nextRootReducer = require('../ducks/index');
			store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
		});
	}
	return { store, persistor };
}
export { history };
