import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawProvider, SelectItemsType } from '../../../store/types';
import Fetch from '../../../service/Fetch';


const useCreate = ()=>{
    const [provider, setProvider] = useState<RawProvider | null>(null);
    const [items, setItems] = useState<SelectItemsType>({});
    const [description, setDescription ] = useState('');

    const setProviderHandle = useCallback((item)=>{
        setProvider(item);
    },[provider]);

    const setItemsHandle = useCallback((items)=>{
        setItems(items);
    },[setItems]);

    const setDescriptionHandle = useCallback((value)=>{
        setDescription(value);
    },[description]);


    const [state, createBill] = useAsyncFn(async ()=>{
        console.log("test333")
        const provider_id = (provider as RawProvider).id;
        const rItems = Object.values(items);
        let cost = 0 ;
        for (let i = 0; i < rItems.length; i++){
            cost += rItems[i].cost * rItems[i].quantity;
        }

        console.log({
            provider_id,
            items: rItems,
            cost,
            description    
        });
        const res = await Fetch.post('api/importbill',{
            provider_id,
            items: rItems,
            cost,
            description
        });

        return res.data
    },[items, description, provider]);

    console.log(state);

    return {
        provider, setProviderHandle, 
        items, setItemsHandle, 
        description, setDescriptionHandle,
        createBill
    }
}

const [Provider,
    useItems,
    useProvider,
    useSetProvider,
    useSetItems,
    useDescription, 
    useSetDescription,
    useCreateBill
] = constate(useCreate,
    value=> value.items,
    value=> value.provider,
    value=> value.setProviderHandle,
    value=> value.setItemsHandle,
    value=> value.description,
    value=> value.setDescriptionHandle,
    value=> value.createBill
)


export const ImportBillCreate =  { 
    Provider,
    useItems,
    useProvider,
    useSetProvider,
    useSetItems,
    useDescription, 
    useSetDescription,
    useCreateBill
};