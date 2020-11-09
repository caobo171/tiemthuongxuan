import { createSlice } from '@reduxjs/toolkit'
import { RawBill, RawImportBill, RawItem, RawProduct } from '../types'
import _ from 'lodash';

type State = {
    show_products: {
        [key: number]: RawProduct
    },
    products: {
        [key: number]: RawProduct
    },
    product_detail: RawProduct | null,
    bill_items: {
        [key: number]: RawItem[]
    },
    import_bill_items: {
        [key: number]: RawItem[]
    }
}
const initialState: State = {
    show_products: {},
    products: {},
    product_detail: null,
    bill_items: {},
    import_bill_items: {}
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        loadProducts(state , action: {payload: RawProduct[]} ) {
            var newObject = _.fromPairs(action.payload.map(e=> [e.id, e]))
            state = {
                ...state,
                products: {
                    ...state.products,
                    ...newObject
                },
                show_products: newObject
            };
        },
        loadProductDetail(state, action: {payload:{
            product: RawProduct,
            import_bill_items:RawItem[],
            bill_items: RawItem[]}
        }) {
            console.log(action.payload);
            state = {
                ...state,
                products: {
                    ...state.products,
                    [action.payload.product.id]:action.payload.product
                },
                bill_items: {
                    ...state.bill_items,
                    [action.payload.product.id]:action.payload.bill_items,
                },
                import_bill_items: {
                    ...state.import_bill_items,
                    [action.payload.product.id]: action.payload.import_bill_items
                }
            };
            return state;
        },
    },
})

export const { loadProducts, loadProductDetail } = productSlice.actions
export default productSlice.reducer