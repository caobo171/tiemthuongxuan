import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useMemo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { SearchTableList } from '../../../components/TableList';
import { RawImportBill, RawProduct } from '../../../store/types';
import CreateProductModal from '../../../components/Product/CreateModal';

interface Props {
    item: RawProduct
}
const Item = React.memo(({ item }: Props) => {
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.cost}</td>
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
            <td scope="col">Giá</td>
        </>)
    }, []);

    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Sản phẩm</h1>

            <a data-toggle="modal" data-target="#product" className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white-50">Thêm mới</span></a>
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
    </>
    )
});


export default List;
