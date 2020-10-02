import constate from 'constate';
import {useCallback, useState, useEffect} from 'react';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawCustomer, SelectItemsType, RawBill, RawItem } from '../../../store/types';
import Fetch from '../../../service/Fetch';


const useDetail = ({customerId})=>{
    const [stateCustomer, fetch] = useAsyncFn(async()=>{
        const res = await Fetch.get<{
            bills: RawBill[],
            customer: RawCustomer
        }>(`api/customer/${customerId}`);

        return res.data;
    },[customerId]);



    useEffect(()=>{
        fetch();
    },[fetch])

    return {stateCustomer};
}

const [
    Provider,
    useStateCustomer
] = constate(
    useDetail,
    value=> value.stateCustomer,
)


export const CustomerDetail =  {
    Provider,
    useStateCustomer
};
