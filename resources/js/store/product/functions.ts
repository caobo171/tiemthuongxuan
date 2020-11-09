import Fetch from '../../service/Fetch';
import store from '../store';
import { RawItem, RawProduct } from '../types';
import { loadProductDetail, loadProducts } from './slice';


const loadDetail = async (productId, storex = store)=>{
    const res = await Fetch.get<{
        bill_items: RawItem[],
        importbill_items: RawItem[],
        product: RawProduct
    }>(`api/product/${productId}`);
    await storex.dispatch(loadProductDetail({
        product: res.data.product,
        import_bill_items: res.data.importbill_items,
        bill_items: res.data.bill_items
    }));
}

export const ProductFunction = {
    loadDetail
}
