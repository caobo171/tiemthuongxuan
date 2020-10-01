import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawCustomer, SelectItemsType, RawBill } from '../../../store/types';
import Fetch from '../../../service/Fetch';


const useCreate = ()=>{
    const [customer, setCustomer] = useState<RawCustomer|null>(null);
    const [items, setItems] = useState<SelectItemsType>({});
    const [bill, setBill ] = useState<RawBill>({
        id: -1,
        description: '',
        created_at: new Date,
        cost: 0,
        status: 'processing',
        customer_id: -1,
        data: "{}",
        extra_cost: 0
    });

    const changeBill = useCallback((key, value)=>{
        setBill({
            ...bill,
            [key]: value
        })
    },[bill])

    const setCustomerHandle = useCallback((customer)=>{
        setCustomer(customer);
    },[customer]);

    const setItemsHandle = useCallback((items)=>{
        setItems(items);
    },[setItems]);

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
        console.log(cost, typeof cost);
        console.log(bill.extra_cost, typeof bill.extra_cost)
        cost += Number(bill.extra_cost);

        const res = await Fetch.post('api/bill',{
            ...bill,
            customer_id,
            items: rItems,
            cost
        });

        return res.data;
    },[items, bill, customer]);

    return {
        customer, setCustomerHandle, 
        items, setItemsHandle, 
        bill, changeBill,
        createBill
    }
}

const [Provider,
    useItems,
    useCustomer,
    useSetCustomer,
    useSetItems,
    useBill, 
    useChangeBill,
    useCreateBill
] = constate(useCreate,
    value=> value.items,
    value=> value.customer,
    value=> value.setCustomerHandle,
    value=> value.setItemsHandle,
    value=> value.bill,
    value=> value.changeBill,
    value=> value.createBill
)


export const BillCreate =  { 
    Provider,
    useItems,
    useCustomer,
    useSetCustomer,
    useSetItems,
    useBill, 
    useChangeBill,
    useCreateBill
};