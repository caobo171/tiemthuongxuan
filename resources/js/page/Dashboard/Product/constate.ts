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
		bill_items: RawItem[]
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
                    cost: 0
                }
            }
            groups[bill_items[i].product_id].cost += bill_items[i].cost;
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


