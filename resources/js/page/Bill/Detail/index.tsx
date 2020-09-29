import constate from 'constate';
import { useCallback, useState} from 'react';
import { useAsync, useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawCustomer, SelectItemsType } from '../../../store/types';
import Fetch from '../../../service/Fetch';


const useDetail = ({billId})=>{

    const state = useAsync(async ()=>{
        const res = Fetch.get(`api/bill/${billId}`);
    },[billId])

    return {

    }
}



export const Detail =  { 

};