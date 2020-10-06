import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawProvider, SelectItemsType, RawImportBill } from '../../../store/types';
import Fetch from '../../../service/Fetch';


const useCreate = ()=>{
    const [provider, setProvider] = useState<RawProvider | null>(null);
    const [items, setItems] = useState<SelectItemsType>({});
    const [bill, setBill ] = useState<RawImportBill>({
        id: -1,
        description: '',
        created_at: new Date,
        cost: 0,
        status: 'processing',
        provider_id: -1,
        data: "{}",
        extra_cost: 0,
        provider_name: ''
    });

    const setProviderHandle = useCallback((item)=>{
        setProvider(item);
    },[provider]);

    const setItemsHandle = useCallback((items)=>{
        setItems(items);
    },[setItems]);

    const changeBill = useCallback((key, value)=>{
        setBill({
            ...bill,
            [key]: value
        })
    },[bill])


    const [state, createBill] = useAsyncFn(async ()=>{
        const provider_id = (provider as RawProvider).id;
        const rItems = Object.values(items);
        let cost = 0 ;
        for (let i = 0; i < rItems.length; i++){
            cost += rItems[i].cost * rItems[i].quantity;
        }


        const res = await Fetch.post('api/importbill',{
            ...bill,
            items: rItems,
            cost,
            provider_id,
            provider_name: (provider as RawProvider).name
        });

        return res.data
    },[items, bill, provider]);

    console.log(state);

    return {
        provider, setProviderHandle,
        items, setItemsHandle,
        bill, changeBill,
        createBill
    }
}

const [Provider,
    useItems,
    useProvider,
    useSetProvider,
    useSetItems,
    useBill,
    useChangeBill,
    useCreateBill
] = constate(useCreate,
    value=> value.items,
    value=> value.provider,
    value=> value.setProviderHandle,
    value=> value.setItemsHandle,
    value=> value.bill,
    value=> value.changeBill,
    value=> value.createBill
)


export const ImportBillCreate =  {
    Provider,
    useItems,
    useProvider,
    useSetProvider,
    useSetItems,
    useBill,
    useChangeBill,
    useCreateBill
};
