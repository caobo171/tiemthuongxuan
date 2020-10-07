import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useMemo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RawBill } from '../../../store/types';
import { SearchTableList } from '../../../components/TableList';

interface Props {
    item: RawBill
}
const Item = React.memo(({ item }: Props) => {
    return <>
        <td>{item.id}</td>
        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
        <td>{item.customer_name}</td>
        <td>{item.status} </td>
        <td>{item.customer_platform}</td>
        <td>{item.cost}</td>
        <td>
            <Link to={`bill/detail/${item.id}`}>View</Link>
        </td>
    </>
});

const List = React.memo(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Ngày tạo</td>
            <td scope="col">Khách hàng</td>
            <td scope="col">Trạng thái</td>
            <td scope="col">Nền tảng</td>
            <td scope="col">Giá trị</td>
            <td scope="col"></td>
        </>)
    }, []);
    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Đơn hàng</h1>

            <Link to={'/bill/create'} className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white-50">Thêm đơn hàng</span></Link>
        </div>
        <div className="row">
            <SearchTableList
                title="Tất cả đơn hàng"
                query={q}
                searchUrl={'api/bill/search'}
                mainUrl={'api/bill'}
                redirectUrl={'bills'}
                rowItem={Item}
                header={header}
                placeholder={'Tìm kiếm đơn hàng ...'}
            />
        </div>
    </>
    )
});


export default List;
