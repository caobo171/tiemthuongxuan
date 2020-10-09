import Axios from 'axios';
import { useAsync, useLocation } from 'react-use';
import React, { useRef, useEffect, useMemo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RawCustomer } from '../../../store/types';
import { useHistory } from "react-router-dom";
import { SearchTableList } from '../../../components/TableList';
import CreateCustomerModal from '../../../components/Customer/CreateModal';


interface Props {
    item: RawCustomer
}
const Item = React.memo(({ item }: Props) => {
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.phone} </td>
        <td>{item.email}</td>
        <td>{item.platform}</td>
        <td>
            <Link to={`/customer/detail/${item.id}`}>View</Link>
        </td>
    </>
});

const List = React.memo(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Tên khách hàng</td>
            <td scope="col">Số điện thoại</td>
            <td scope="col">Email</td>
            <td scope="col">Nền tảng</td>
            <td scope="col"></td>
        </>)
    }, []);

    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Khách hàng</h1>

            <a data-toggle="modal" data-target="#customer" className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white">Thêm khách hàng</span></a>
        </div>
        <div className="row">
            <SearchTableList
                title="Tất cả khách hàng"
                query={q}
                searchUrl={'api/customer/search'}
                mainUrl={'api/customer'}
                redirectUrl={'customers'}
                rowItem={Item}
                header={header}
                placeholder={'Tìm kiếm khách hàng ...'}
            />
        </div>
        <CreateCustomerModal/>
    </>
    )
});


export default List;
