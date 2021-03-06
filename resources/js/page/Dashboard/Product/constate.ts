import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn, useAsync } from 'react-use';
import Axios from 'axios';
import Fetch from '../../../service/Fetch';
import { RawBill, RawImportBill, RawItem, RawAsset } from '../../../store/types';
import { PLATFORMS } from '../../../Constants';
import _ from 'lodash';

const useProductReport = ({startDate, endDate})=>{
  const state = useAsync(async ()=>{
	const res = await Fetch.post<{
        bill_items: RawItem[],
        importbill_items: RawItem[]
	}>('api/report.product',{
		start_date: startDate,
		end_date: endDate
	});

    const groups = {};
	if (res.data){
        const bill_items = res.data.bill_items;
        for(let i = 0 ; i< res.data.bill_items.length; i++){
            if(!groups[bill_items[i].product_id]){
                groups[bill_items[i].product_id] = {
                    id: bill_items[i].product_id,
                    name: bill_items[i].product_name,
                    cost: 0,
                    quantity: 0,
                    remain_quantity: 0,
                    expense: 0
                }
            }
            groups[bill_items[i].product_id].cost += Number(bill_items[i].cost) * Number(bill_items[i].quantity);
            groups[bill_items[i].product_id].quantity += Number(bill_items[i].quantity);
            groups[bill_items[i].product_id].remain_quantity += Number(bill_items[i].quantity);
        }

        for(let i = 0 ; i< res.data.importbill_items.length; i++){
            const bill = res.data.importbill_items[i]
            if(!groups[bill.product_id]){
                groups[bill.product_id] = {
                    id: bill.product_id,
                    name: bill.product_name,
                    cost: 0,
                    quantity:0,
                    remain_quantity:0,
                    expense: 0
                }
            }

            let subtract_quantity = 0;
            if (Number(groups[bill.product_id].remain_quantity) > 0) {
                subtract_quantity = Math.min(Number(groups[bill.product_id].remain_quantity), Number(bill.quantity))
            }
            groups[bill.product_id].remain_quantity -= subtract_quantity;
            groups[bill.product_id].expense += subtract_quantity* Number(bill.cost);
            
        }
		return {
			groups: Object.values(groups)
		};
	}
	return null;
  },[startDate, endDate])



  return {state};
}

const [Provider,
	useProductGroups,
] = constate(useProductReport,
    value=> value.state
)


export const ProductReportConstate =  {
    Provider,
	useProductGroups
};


