import constate from 'constate';
import {useCallback, useState, useEffect} from 'react';
import { useAsync, useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawProvider, SelectItemsType, RawImportBill, RawItem } from '../../../store/types';
import Fetch from '../../../service/Fetch';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';


const useUpdate = ({billId})=>{
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

    const stateBill = useAsync(async()=>{
        const res = await Fetch.get<{
            bill: RawImportBill,
            bill_items: RawItem[],
            provider: RawProvider
        }>(`api/importbill/${billId}`);
        if(res.data){
            setProvider(res.data.provider);
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


    const [state, updateBill] = useAsyncFn(async ()=>{
        const provider_id = (provider as RawProvider).id;
        const rItems = Object.values(items);
        let cost = 0 ;
        for (let i = 0; i < rItems.length; i++){
            cost += rItems[i].cost * rItems[i].quantity;
        }

        cost += Number(bill.extra_cost);
        const res = await Fetch.put(`api/importbill/${bill.id}`,{
            ...bill,
            items: rItems,
            cost,
            provider_id,
            provider_name: (provider as RawProvider).name,
            //@ts-ignore
            description: window.editor.getData()
        });

        return res.data
    },[items, bill, provider]);

    const alert = useAlert();
    const history = useHistory();
    useEffect(()=>{
        if(state.value){
            alert.show("Create bill successful", {type: 'success'});
            history.push(`/importbill/detail/${bill.id}`)
            return ;
        }
        if(state.error){
            alert.show(state.error.message, {type: 'error'});
        }
    },[state,bill])

    return {
        provider, setProviderHandle,
        items, setItemsHandle,
        bill, changeBill,
        updateBill
    }
}

const [Provider,
    useItems,
    useProvider,
    useSetProvider,
    useSetItems,
    useBill,
    useChangeBill,
    useUpdateBill
] = constate(useUpdate,
    value=> value.items,
    value=> value.provider,
    value=> value.setProviderHandle,
    value=> value.setItemsHandle,
    value=> value.bill,
    value=> value.changeBill,
    value=> value.updateBill
)


export const ImportBillUpdate =  {
    Provider,
    useItems,
    useProvider,
    useSetProvider,
    useSetItems,
    useBill,
    useChangeBill,
    useUpdateBill
};
