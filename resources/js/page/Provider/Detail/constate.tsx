import constate from 'constate';
import {useCallback, useState, useEffect} from 'react';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawCustomer, SelectItemsType, RawBill, RawItem, RawProvider, RawImportBill } from '../../../store/types';
import Fetch from '../../../service/Fetch';


const useDetail = ({providerId})=>{
    const [stateProvider, fetch] = useAsyncFn(async()=>{
        const res = await Fetch.get<{
            bills: RawImportBill[],
            provider: RawProvider
        }>(`api/provider/${providerId}`);

        return res.data;
    },[providerId]);



    useEffect(()=>{
        fetch();
    },[fetch])

    return {stateProvider};
}

const [
    Provider,
    useStateProvider
] = constate(
    useDetail,
    value=> value.stateProvider,
)


export const ProviderDetail =  {
    Provider,
    useStateProvider
};
