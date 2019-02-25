import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Creators as ActionsAgenda, Types } from 'ducks/Agenda';
import { database } from 'firebaseConfig/firebase';

const getAgendasReq = async () =>
	await database
		.collection('agenda')
		.get()
		.then((querySnapshot) => {
			let data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			return data;
		})
		.catch((error) => error);

function* getAgendas() {
	try {
		const listaAgendas = yield call(getAgendasReq);
		yield put(ActionsAgenda.getAgendasSuces(listaAgendas));
	} catch (error) {
		console.log('error', error);
	}
}

export function* getAgendasAcao() {
	yield takeEvery(Types.GET_AGENDAS, getAgendas);
}

export default function* rootSaga() {
	yield all([ fork(getAgendasAcao) ]);
}
