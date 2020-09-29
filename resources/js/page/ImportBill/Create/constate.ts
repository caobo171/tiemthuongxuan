import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawProvider, SelectItemsType } from '../../../store/types';


const useCreate = ()=>{
    const [provider, setProvider] = useState<RawProvider | null>(null);
    const [items, setItems] = useState<SelectItemsType>({});
    const [description, setDescription ] = useState('');

    const setProviderHandle = useCallback((item)=>{
        setProvider(item);
    },[provider]);

    const setItemHandle = useCallback((item)=>{
        const value = {
            ...items,
            [item.id]: item
        };
        setItems(value);
    },[items]);

    const setDescriptionHandle = useCallback((value)=>{
        setDescription(value);
    },[description]);


    const [state, createBill] = useAsyncFn(async ()=>{
        const provider_id = (provider as RawProvider).id;
        const rItems = Object.values(items).map(e=>({
            ...e,
            quantity: 1
        }));
        let cost = 0 ;
        for (let i = 0; i < rItems.length; i++){
            cost += items[i].cost * rItems[i].quantity;
        }

        const res = await Axios.post('/api/importbill',{
            provider_id,
            items: rItems,
            cost,
            description
        });
        console.log(res);
    },[items, description, provider]);

    return {
        provider, setProviderHandle, 
        items, setItemHandle, 
        description, setDescriptionHandle,
        createBill
    }
}

const [Provider,
    useItems,
    useProvider,
    useSetProvider,
    useSetItem,
    useDescription, 
    useSetDescription,
    useCreateBill
] = constate(useCreate,
    value=> value.items,
    value=> value.provider,
    value=> value.setProviderHandle,
    value=> value.setItemHandle,
    value=> value.description,
    value=> value.setDescriptionHandle,
    value=> value.createBill
)


export const ImportBillCreate =  { 
    Provider,
    useItems,
    useProvider,
    useSetProvider,
    useSetItem,
    useDescription, 
    useSetDescription,
    useCreateBill
};