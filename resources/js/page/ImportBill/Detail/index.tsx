import constate from 'constate';
import {useCallback, useState, useEffect} from 'react';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import { RawCustomer, SelectItemsType, RawBill, RawItem } from '../../../store/types';
import Fetch from '../../../service/Fetch';


const useDetail = ({billId})=>{
    const [stateBill, fetch] = useAsyncFn(async()=>{
        const res = await Fetch.get<{
            bill: RawBill,
            bill_items: RawItem[],
            customer: RawCustomer
        }>(`api/bill/${billId}`);

        return res.data;
    },[billId]);

    const [status, changeStatus] = useAsyncFn(async(status)=>{
        const res = await Fetch.post(`api/bills/status`, {
            id: stateBill.value?.bill.id,
            status: status
        });
        return res.data;
    },[stateBill]);

    useEffect(()=>{
        if(!status.loading){
            fetch();
        }
    },[status])

    return {stateBill, changeStatus};
}

const [Provider,
    useStateBill,
    useChangeStatus
] = constate(
    useDetail,
    value=> value.stateBill,
    value=> value.changeStatus
)


export const BillDetail =  { 
    Provider,
    useStateBill,
    useChangeStatus
};