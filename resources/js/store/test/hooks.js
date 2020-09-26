import {useSelector } from 'react-redux'
import store from '../store'



export const useNumber = ()=>{
    return useSelector((state)=> state.counter.value);
};