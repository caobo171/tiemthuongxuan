
import rootReducer from './rootReducer';
export type RootState = ReturnType<typeof rootReducer>

declare module "react-redux" {
    export type EqualityFnType<TSelected> = (left: TSelected, right: TSelected) => boolean

    export function useSelector<TSelected>(
        selector: (state: RootState) => TSelected,
        equalityFn?: EqualityFnType<TSelected>
    ): TSelected
}

export type RawProduct = {
    id: number,
    created_at: Date,
    cost: number,
    quantiy: number,
    image: null | string,
    description: string,
    name: string,
    sku: string,
    history_price: null
}

export type RawItem = {
    id: number,
    product_id: number,
    created_at: Date,
    bill_id: number,
    product_name: string,
    status: string,
    cost: number
}

export type SelectItemType = {
    id: number,
    sku: string,
    name: string
    product_name: string,
    status: string,
    cost: number,
    quantity: number
}

export type RawProvider = {
    id: number,
    created_at: Date,
    name: string,
    phone: string,
    email: string,
    description: string,
}

export type RawCustomer = {
    id: number,
    created_at: Date,
    name: string,
    phone: string,
    email: string,
    description: string
}

export type RawBill = {
    id: number,
    description: string,
    created_at: Date,
    cost: number,
    status: string,
    user_id: number,
    data: any
}


export type RawImportBill = {
    id: number,
    description: string,
    created_at: Date,
    cost: number,
    status: string,
    user_id: number,
    data: any
}


export type SelectItemsType = {
    [key:number]: SelectItemType
}