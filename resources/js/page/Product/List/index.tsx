import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { SearchTableList } from '../../../components/TableList';
import { RawImportBill, RawProduct } from '../../../store/types';
import CreateProductModal from '../../../components/Product/CreateModal';
import EditProductModal from '../../../components/Product/EditModal';
import { money } from '../../../service/utils';
import { ProductContext } from '../../../components/Product/EditModal';
import Fetch from '../../../service/Fetch';
import { useAlert } from 'react-alert';

interface Props {
    item: RawProduct
}
const Item = React.memo(({ item }: Props) => {
    const {setProduct} = useContext(ProductContext);
    const alert = useAlert();
    const onRemove = useCallback(async ()=>{
        if (window.confirm("Are you sure to remove?")){
            const res = await Fetch.delete(`api/product/${item.id}`);
            if(res.data){
                alert.show("Delete successful", {type: 'success'});
            }
        }
    },[item])
    const onClick = useCallback(()=>{
        setProduct(item)
    },[])
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{money(item.cost)}</td>
        <td>
            <i onClick={onRemove} className={"fas fa-trash"}></i>
            <i data-toggle="modal" data-target="#editProduct" 
            onClick = {onClick}
            className={"fas fa-pen"}></i>
        </td>
        <td>
            <Link  to={`/product/detail/${item.id}`}>View</Link>
        </td>
    </>
});

const List = React.memo(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Mặt hàng</td>
            <td scope="col">Số lượng còn lại</td>
            <td scope="col">Giá bán</td>
            <td scope="col">Hành động</td>
            <td></td>
        </>)
    }, []);

    const [product, setProduct] = useState(null);
    const changeProduct = useCallback((value)=>{
        setProduct(value)
    },[product])

    return (<ProductContext.Provider value={{product, setProduct: changeProduct}}>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Sản phẩm</h1>

            <a data-toggle="modal" data-target="#product" className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white">Thêm mới</span></a>
        </div>
        <div className="row">
            <SearchTableList
                title="Tất cả mặt hàng"
                query={q}
                searchUrl={'api/product/search'}
                mainUrl={'api/product'}
                redirectUrl={'products'}
                rowItem={Item}
                header={header}
                placeholder={'Tìm kiếm mặt hàng ...'}
            />
        </div>
        <CreateProductModal/>
        <EditProductModal/>
    </ProductContext.Provider>
    )
});


export default List;
