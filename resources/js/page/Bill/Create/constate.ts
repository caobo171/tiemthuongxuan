import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawCustomer, SelectItemsType } from '../../../store/types';
import Fetch from '../../../service/Fetch';


const useCreate = ()=>{
    const [customer, setCustomer] = useState<RawCustomer|null>(null);
    const [items, setItems] = useState<SelectItemsType>({});
    const [description, setDescription ] = useState('');

    const setCustomerHandle = useCallback((customer)=>{
        setCustomer(customer);
    },[customer]);

    const setItemsHandle = useCallback((items)=>{
        setItems(items);
    },[setItems]);

    const setDescriptionHandle = useCallback((value)=>{
        setDescription(value);
    },[description]);


    const [state, createBill] = useAsyncFn(async ()=>{
        const customer_id = (customer as RawCustomer).id;
        const rItems = Object.values(items).map(e=>({
            ...e,
            quantity: 1
        }));
        let cost = 0 ;
        for (let i = 0; i < rItems.length; i++){
            cost += rItems[i].cost * rItems[i].quantity;
        }

        const res = await Fetch.post('api/bill',{
            customer_id,
            items: rItems,
            cost,
            description
        });

        return res.data;
    },[items, description, customer]);

    return {
        customer, setCustomerHandle, 
        items, setItemsHandle, 
        description, setDescriptionHandle,
        createBill
    }
}

const [Provider,
    useItems,
    useCustomer,
    useSetCustomer,
    useSetItems,
    useDescription, 
    useSetDescription,
    useCreateBill
] = constate(useCreate,
    value=> value.items,
    value=> value.customer,
    value=> value.setCustomerHandle,
    value=> value.setItemsHandle,
    value=> value.description,
    value=> value.setDescriptionHandle,
    value=> value.createBill
)


export const BillCreate =  { 
    Provider,
    useItems,
    useCustomer,
    useSetCustomer,
    useSetItems,
    useDescription, 
    useSetDescription,
    useCreateBill
};