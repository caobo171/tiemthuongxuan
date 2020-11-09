import constate from 'constate';
import {useCallback, useState, useEffect} from 'react';
import { useAsync, useAsyncFn } from 'react-use';
import { RawCustomer, SelectItemsType, RawBill, RawItem } from '../../../store/types';
import Fetch from '../../../service/Fetch';
import { useHistory } from 'react-router-dom';
import { BillDetail } from '../Detail/constate';
import { toast } from 'react-toastify';


const useUpdate = ({billId})=>{

    const stateBill = useAsync(async()=>{
        const res = await Fetch.get<{
            bill: RawBill,
            bill_items: RawItem[],
            customer: RawCustomer
        }>(`api/bill/${billId}`);
        if(res.data){
            setCustomer(res.data.customer);
            setBill(res.data.bill);
            const bill_items = res.data.bill_items;
            const items_object:SelectItemsType = {};
            for(let i =0 ; i< bill_items.length; i++ ){
                items_object[bill_items[i].id] = bill_items[i];
            }
            setItems(items_object);
        }
        
        return res.data;
    },[billId]);
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

    const [state, updateBill] = useAsyncFn(async ()=>{

        const rItems = Object.values(items);
        let cost = 0 ;
        for (let i = 0; i < rItems.length; i++){
            cost += rItems[i].cost * rItems[i].quantity;
        }

        cost += Number(bill.extra_cost);
        const res = await Fetch.put(`api/bill/${bill.id}`,{
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
        updateBill
    }


}

const [Provider,
    useItems,
    useCustomer,
    useSetCustomer,
    useSetItems,
    useBill,
    useChangeBill,
    useUpdateBill
] = constate(useUpdate,
    value=> value.items,
    value=> value.customer,
    value=> value.setCustomerHandle,
    value=> value.setItemsHandle,
    value=> value.bill,
    value=> value.changeBill,
    value=> value.updateBill
)


export const BillUpdate =  {
    Provider,
    useItems,
    useCustomer,
    useSetCustomer,
    useSetItems,
    useBill,
    useChangeBill,
    useUpdateBill
};
