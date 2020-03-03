import { all } from 'redux-saga/effects';

import auth from './auth/sagas';

function* rootSaga() {
  return yield all([auth]);
}

export default rootSaga;
