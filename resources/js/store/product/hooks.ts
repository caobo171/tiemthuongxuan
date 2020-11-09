import {useSelector } from 'react-redux'
import store from '../store'



const useDetail = (product_id: number)=>{
    return useSelector((state)=> {
        console.log(state)
       return {
           product: state.product.products[product_id],
           bill_items: state.product.bill_items[product_id],
           import_bill_items: state.product.import_bill_items[product_id],
       }
    });
};

export const ProductHook = {
    useDetail
};