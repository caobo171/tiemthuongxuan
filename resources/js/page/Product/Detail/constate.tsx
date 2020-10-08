import React from 'react';
import { useAsync } from 'react-use';
import { RawItem, RawProduct } from '../../../store/types';
import Fetch from '../../../service/Fetch';
import constate from 'constate';


const useDetail = ({productId})=>{
	const state = useAsync(async ()=>{
		const res = await Fetch.get<{
            bill_items: RawItem[],
			importbill_items: RawItem[],
			product: RawProduct
		}>(`api/product/${productId}`);
		
		return res.data;
	}, [productId])

	return {state}
}


const [
	Provider,
	useStateProduct 
]	 = constate(
	useDetail,
	value => value.state
)

export const ProductDetail =  {
    Provider,
    useStateProduct
};
