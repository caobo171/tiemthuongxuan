import {combineReducers} from 'redux'

import CounterReducer from './test/slice'
import ProductReducer from './product/slice'


const appReducer = combineReducers({
    counter: CounterReducer,
    product: ProductReducer,
});



export default appReducer;