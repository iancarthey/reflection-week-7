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
    yield takeEvery('DELETE_REFLECTION', deleteReflectionSaga)
    yield takeEvery('BOOKMARK_REFLECTION', bookmarkReflectionSaga)
}

function* addReflectionSaga( action ){
   try{ 
        yield call(axios.post, '/reflection', action.payload);
        yield put({
            type: 'FETCH_REFLECTION'
        })
    } catch (error){

    }
}

function* getReflectionSaga( action ){
    try{ 
        const reflectionResponse = yield call(axios.get, '/reflection')
        yield put({
            type: 'SET_REFLECTION',
            payload: reflectionResponse.data
        })
    } catch (error){

}
}

function* deleteReflectionSaga( action ){
    try{
        yield call(axios.delete, `/reflection/?id=${action.payload.id}`)
        yield put({
            type: 'FETCH_REFLECTION'
        })
    } catch (error) {

    }
}

function* bookmarkReflectionSaga(action) {
    try{
        yield call(axios.put, `/reflection/?id=${action.payload.id}`, action.payload)
        yield put({
            type: 'FETCH_REFLECTION'
        })
    } catch (error){

    }
}

const reflectionList = (state = [], action) => {
    switch(action.type){
        case 'SET_REFLECTION':
            return action.payload;
        default:
            return state;
    }
}

//create store
const store = createStore (
    combineReducers({ reflectionList }),
    applyMiddleware(sagaMiddleware, logger)
)

//RUN MIDDLEWARE
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></ Provider>, document.getElementById('root'));
registerServiceWorker();
