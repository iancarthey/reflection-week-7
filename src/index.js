import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//create Saga middleware
const sagaMiddleware = createSagaMiddleware();

//root function
function* rootSaga(){
    yield takeEvery('ADD_REFLECTION', addReflectionSaga)
    yield takeEvery('FETCH_REFLECTION', getReflectionSaga)
}

function* addReflectionSaga( action ){
    const reflectionToAdd = yield call(axios.post, '/reflection', action.payload);
    yield put({
        action: 'FETCH_REFLECTION'
    })
}

function* getReflectionSaga( action ){
    yield put({
        action: 'SET_REFLECTION'
    })
}

//create store
const store = createStore (
    combineReducers({ }),
    applyMiddleware(sagaMiddleware, logger)
)

//RUN MIDDLEWARE
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></ Provider>, document.getElementById('root'));
registerServiceWorker();
