import constate from 'constate';
import {useCallback, useState} from 'react';
import { useAsyncFn, useAsync } from 'react-use';
import Axios from 'axios';
import Fetch from '../../../service/Fetch';
import { RawBill, RawImportBill, RawAsset, RawItem, RawProduct } from '../../../store/types';
import * as _ from 'lodash'



const useDashboard = ({startDate, endDate})=>{
  const state = useAsync(async ()=>{
	const res = await Fetch.post<{
		bills: RawBill[],
		import_bills: RawImportBill[],
        assets: RawAsset[],
        importbill_items: RawItem[],
        bill_items: RawItem[],
        revenue_importbill_items: RawItem[],
        products: RawProduct[]
	}>('api/report',{
		start_date: startDate,
		end_date: endDate
	});

	if(res.data){
        let products = _.fromPairs(res.data.products.map(e=>[
            e.id, 
            {...e,remain_quantity: Number(e.quantity), quantity: 0, remain_stock: 0}
        ]));
        let result:any = {
            bills: res.data.bills.length,
            success_bills: 0,
            failed_bills: 0,
            other_bills: 0,

            revenue : 0,
            totalProfit: 0,
            profit: 0,
            remain_stock :0,

            fund: 0,
            fixed_asset: 0,
            import_fund: 0,
            repay: 0,

            pending_money: 0,
            customers: {},
            products: [],
            assets: [],
            platforms : {
                'shopee': 0,
                'facebook': 0,
                'onshop': 0
            }
        };

        const bills = res.data.bills;
        const import_bills = res.data.import_bills;
        const importbill_items = res.data.importbill_items;

        for(let i = importbill_items.length -1 ; i >= 0; i--) {
            const item = importbill_items[i];
            if (products[item.product_id]) {
                var remain_item = Number(products[item.product_id].remain_quantity);
                var substract = Math.min(remain_item, Number(item.quantity));
                if (substract > 0) {
                    products[item.product_id].remain_quantity -= substract;
                    products[item.product_id].quantity += substract;
                    products[item.product_id].remain_stock += substract * Number(item.cost);
                    result.remain_stock += substract * Number(item.cost);
                }
            } else {
                console.log('FALSE FALSE',item);
            }
        }

        result.products = Object.values(products).filter(e => e.quantity > 0);

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

        // for (let i = 0 ; i < import_bills.length; i++){
        //     result.import_fund += Number(import_bills[i].cost);
        // }

        /**
         * Calculate import cost 
         */
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
    
            for(let i = 0 ; i< res.data.revenue_importbill_items.length; i++){
                const bill = res.data.revenue_importbill_items[i]
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
        }

        var revenue_products:any[] = Object.values(groups);
        for(let i =0 ; i < revenue_products.length; i++) {
            result.import_fund += revenue_products[i].expense;
        }
        //@ts-ignore
        window.revenue_products = revenue_products

        /** End  */

        for (let i=0 ; i< res.data.assets.length; i++){
            const asset = res.data.assets[i];
            const start = Math.max(new Date(startDate).getTime(), new Date(asset.created_at).getTime());


            const expired_date = new Date(asset.created_at);
            expired_date.setDate(expired_date.getDate() + Number(asset.cycle));
            const end = Math.min(new Date(endDate).getTime(), expired_date.getTime());

            const difference = Math.floor((end - start)/ (1000 * 3600 * 24));

            if(difference > 0 ){
                result.fixed_asset += (Number(asset.cost) / Number(asset.cycle)) * difference;
                result.assets.push({
                    name: asset.name,
                    expense: (Number(asset.cost) / Number(asset.cycle)) * difference,
                    cost: asset.cost
                })
            }
        }

        result.fund = result.fixed_asset + result.import_fund + result.repay;
        result.totalProfit = result.revenue - result.import_fund ;
        result.profit = result.revenue - result.fund + result.remain_stock;
        //@ts-ignore
        window.result = result
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


