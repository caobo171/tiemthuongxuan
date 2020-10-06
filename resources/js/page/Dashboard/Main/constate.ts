import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn, useAsync } from 'react-use';
import Axios from 'axios';
import Fetch from '../../../service/Fetch';
import { RawBill, RawImportBill, RawItem, RawAsset } from '../../../store/types';
import { PLATFORMS } from '../../../Constants';


const useDashboard = ({startDate, endDate})=>{
  const state = useAsync(async ()=>{
	const res = await Fetch.post<{
		bills: RawBill[],
		import_bills: RawImportBill[],
		bill_items: RawItem[],
		importbill_items: RawItem[],
		assets: RawAsset[]
	}>('api/report',{
		start_date: startDate,
		end_date: endDate
	});

	if(res.data){
		//bad code
		const success_bills = res.data.bills.filter(e=>e.status === 'success')


        const revenue = success_bills.map(e=>e.cost).reduce((a, b) => a + b, 0);

		//bad code
		const fund = res.data.import_bills
		.map(e=>e.cost).reduce((a, b) => a + b, 0);

		//bad code
		const fixedExpense = res.data.assets
		.filter(e => {
			let expiredDate = new Date(e.created_at);
			expiredDate.setDate(expiredDate.getDate() + e.cycle);
			if(expiredDate.getTime() < endDate.getTime()){
				return true;
			}else{
				return false;
			}
		})
		.map(e=> {
			return (e.cost)
		}).reduce((a, b) => a + b, 0);

		const totalProfit = revenue - fund;
        const profit = totalProfit - fixedExpense;

        const platforms = {};
        const keys = Object.keys(PLATFORMS);
        for(let i = 0 ;i< keys.length; i++){
            platforms[keys[i]] = 0;
        }

        for(let i = 0; i < success_bills.length; i++){
            platforms[success_bills[i].customer_platform] += success_bills[i].cost;
        }

        const customers = {};
        for(let i = 0; i< res.data.bills.length; i++){
            if(!customers[res.data.bills[i].customer_id]){
                customers[res.data.bills[i].customer_id] = {
                    id: res.data.bills[i].customer_id,
                    name: res.data.bills[i].customer_name,
                    cost: 0
                };
            }
            customers[res.data.bills[i].customer_id].cost += res.data.bills[i].cost;
        }


		return {
			revenue,
			fund,
			totalProfit,
			profit,
            fixedExpense,
            platforms,
            customers: Object.values(customers)
		};
	}
	return null;
  },[startDate, endDate])



  return {state};
}

const [Provider,
	useReport,
] = constate(useDashboard,
    value=> value.state
)


export const DashboardConstate =  {
    Provider,
	useReport
};


