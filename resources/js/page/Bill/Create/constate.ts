import constate from 'constate';
import {useCallback, useState, useEffect} from 'react';
import { useAsyncFn } from 'react-use';
import { RawCustomer, SelectItemsType, RawBill } from '../../../store/types';
import Fetch from '../../../service/Fetch';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


const useCreate = ()=>{
    const [customer, setCustomer] = useState<RawCustomer|null>(null);
    const [items, setItems] = useState<SelectItemsType>({});
    const [bill, setBill ] = useState<RawBill>({
        id: -1,
        description: '',
        created_at: new Date(),
        cost: 0,
        status: 'processing',
        customer_id: -1,
        data: "{}",
        extra_cost: 0,
        customer_name: '',
        customer_platform:'onshop'
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
        console.log(items);
        setItems(items);
    },[setItems]);

    const [state, createBill] = useAsyncFn(async ()=>{

        const rItems = Object.values(items);
        let cost = 0 ;
        for (let i = 0; i < rItems.length; i++){
            cost += rItems[i].cost * rItems[i].quantity;
        }

        cost += Number(bill.extra_cost);
        const res = await Fetch.post('api/bill',{
            ...bill,
            customer_id: (customer as RawCustomer).id,
            items: rItems,
            cost,
            customer_name: (customer as RawCustomer).name,
            customer_platform: (customer as RawCustomer).platform,
            //@ts-ignore
            description: window.editor.getData()
        });

        return res.data;
    },[items, bill, customer]);

    const history = useHistory();
    useEffect(()=>{
        if(state.value){
            //@ts-ignore
            if(state.value.error){
                //@ts-ignore
                toast.error(state.value.message);
                return ;
            }
            toast.success("Create bill successful");
            history.push('/bills')
            return ;
        }
        if(state.error){
            toast.error(state.error.message);
        }
    },[state])

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
