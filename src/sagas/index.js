import { all } from 'redux-saga/effects';
import authSagas from './Auth';
import agendaSagas from './Agenda';
export default function* rootSaga(getState) {
	yield all([
	authSagas(),
	agendaSagas()
	]);
}
