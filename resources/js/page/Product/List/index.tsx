import React, { useCallback, useContext, useMemo, useState } from 'react';
import { SearchTableList } from '../../../components/TableList';
import CreateProductModal from '../../../components/Product/CreateModal';
import EditProductModal from '../../../components/Product/EditModal';
import { ProductContext } from '../../../components/Product/EditModal';

import Item from './RowItem';

export const ListContext = React.createContext<{reload:()=>void}>({
    reload:()=>{}
});

const List = React.memo(() => {


    const [state,setState] = useState(0);
    const reload = useCallback(()=>{
        setState(Math.random());
    },[state])

    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Mã sku</td>
            <td scope="col">Mặt hàng</td>
            <td scope="col">Số lượng còn lại</td>
            <td scope="col">Giá bán</td>
            <td scope="col">Hành động</td>
        </>)
    }, [state, window.location.search]);

    const [product, setProduct] = useState(null);
    const changeProduct = useCallback((value)=>{
        setProduct(value)
    },[product])

    return (
        <ProductContext.Provider value={{product, setProduct: changeProduct, reload:reload}}>
        <ListContext.Provider value={{reload}}>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Sản phẩm</h1>

            <a data-toggle="modal" data-target="#product" className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white">Thêm mới</span></a>
        </div>
        <div className="row">
            <SearchTableList
                title="Tất cả mặt hàng"
                mainUrl={'api/product'}
                redirectUrl={'products'}
                rowItem={Item}
                header={header}
                reload={state}
                placeholder={'Tìm kiếm mặt hàng ...'}
            />
        </div>
            <EditProductModal reload ={reload}/>
            <CreateProductModal reload={reload}/>
        </ListContext.Provider>
        </ProductContext.Provider>    
    )
});


export default List;
