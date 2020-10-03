import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn, useAsync } from 'react-use';
import Axios from 'axios';
import Fetch from '../../service/Fetch';
import { RawBill, RawImportBill, RawItem, RawAsset } from '../../store/types';


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
		const revenue = res.data.bills.filter(e=>e.status === 'success')
		.map(e=>e.cost).reduce((a, b) => a + b, 0);

		//bad code
		const fund = res.data.import_bills.filter(e=> e.status === 'success')
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
		console.log(fixedExpense);
		const profit = totalProfit - fixedExpense;
		return {
			revenue,
			fund,
			totalProfit,
			profit,
			fixedExpense
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