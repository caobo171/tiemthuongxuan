import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn, useAsync } from 'react-use';
import Axios from 'axios';
import Fetch from '../../../service/Fetch';
import { RawBill, RawImportBill, RawItem, RawAsset } from '../../../store/types';
import { PLATFORMS, BILL_STATUS } from '../../../Constants';




const useDashboard = ({startDate, endDate})=>{
  const state = useAsync(async ()=>{
	const res = await Fetch.post<{
		bills: RawBill[],
		import_bills: RawImportBill[],
		assets: RawAsset[]
	}>('api/report',{
		start_date: startDate,
		end_date: endDate
	});

	if(res.data){
        const result = {
            bills: res.data.bills.length,
            success_bills: 0,
            failed_bills: 0,
            other_bills: 0,

            revenue : 0,
            totalProfit: 0,
            profit: 0,

            fund: 0,
            fixed_asset: 0,
            import_fund: 0,
            repay: 0,

            pending_money: 0,


            customers: {},
            platforms : {
                'shopee': 0,
                'facebook': 0,
                'onshop': 0
            }
        };

        const bills = res.data.bills;
        const import_bills = res.data.import_bills;
        for(let i = 0 ; i < bills.length; i++){
            const bill  = res.data.bills[i];

            result.platforms[bill.customer_platform] += Number(bill.cost);
            if(!result.customers[res.data.bills[i].customer_id]){
                result.customers[res.data.bills[i].customer_id] = {
                    id: res.data.bills[i].customer_id,
                    name: res.data.bills[i].customer_name,
                    cost: 0,
                    bills: 0,
                    pending: 0,
                    pending_bills: 0
                };
            }
            result.customers[res.data.bills[i].customer_id].bills += 1;
            if(bill.status === 'success'){
                result.revenue += Number(bill.cost);
                result.success_bills += 1;
                console.log('test', bill)
                result.customers[res.data.bills[i].customer_id].cost += Number(bill.cost);
            }
            else if(bill.status === 'broken'){
                result.failed_bills += 1;
                result.repay += Number(bill.cost);
            }
            else {
                result.other_bills +=1;
                result.pending_money += Number(bill.cost);
                result.customers[res.data.bills[i].customer_id].pending += Number(bill.cost);
                result.customers[res.data.bills[i].customer_id].pending_bills += 1;
            }
        }

        for (let i = 0 ; i < import_bills.length; i++){
            result.import_fund += Number(import_bills[i].cost);
        }

        for (let i=0 ; i< res.data.assets.length; i++){
            const asset = res.data.assets[i];
            const start = Math.max(new Date(startDate).getTime(), new Date(asset.created_at).getTime());

            const expired_date = new Date(asset.created_at);
            expired_date.setDate(expired_date.getDate() + asset.cycle);
            const end = Math.min(new Date(endDate).getTime(), expired_date.getTime());

            const difference = Math.floor((end - start)/ (1000 * 3600 * 24));

            if(difference > 0 ){
                result.fixed_asset += (Number(asset.cost) / Number(asset.cycle)) * difference;
            }
        }

        result.fund = result.fixed_asset + result.import_fund + result.repay;
        result.totalProfit = result.revenue - result.import_fund;
        result.profit = result.revenue - result.fund;


        return {
            ...result,
            customers: Object.values(result.customers)
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


