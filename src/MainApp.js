import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import configureStore, { history } from './store';
import Aplicacao from './app';
import { PersistGate } from 'redux-persist/integration/react';
export const { store, persistor } = configureStore();
const MainApp = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<ConnectedRouter history={history}>
				<Switch>
					<Route path="/" component={Aplicacao} />
				</Switch>
			</ConnectedRouter>
		</PersistGate>
	</Provider>
);

export default MainApp;
