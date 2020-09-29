import store from '../store';
import { increment, decrement, incrementByAmount } from '../test/slice';


export const increase = (storex = store)=>{
    storex.dispatch(increment());
}