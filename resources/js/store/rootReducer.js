import {combineReducers} from 'redux'

import CounterReducer from './test/slice'


const appReducer = combineReducers({
    counter: CounterReducer,
});



export default appReducer;