import Axios from 'axios';
import { useAsync, useLocation } from 'react-use';
import React, { useRef, useEffect, useMemo, useState, useCallback, useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RawCustomer } from '../../../store/types';
import { useHistory } from "react-router-dom";
import { SearchTableList } from '../../../components/TableList';
import CreateCustomerModal from '../../../components/Customer/CreateModal';
import { CustomerContext } from '../../../components/Customer/EditModal';
import Fetch from '../../../service/Fetch';
import {useAlert} from 'react-alert';
import EditModal from '../../../components/Customer/EditModal';

interface Props {
    item: RawCustomer
}
const Item = React.memo(({ item }: Props) => {
    const alert = useAlert();
    const {setCustomer} = useContext(CustomerContext);
    const onRemove = useCallback(async ()=>{
        if (window.confirm("Are you sure to remove?")){
            const res = await Fetch.delete(`api/customer/${item.id}`);
            if(res.data){
                alert.show("Delete successful", {type: 'success'});
            }
        }
    },[item])
    const onClick = useCallback(()=>{
        setCustomer(item)
        console.log(item);
    },[item])
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.phone} </td>
        <td>{item.email}</td>
        <td>{item.platform}</td>
        <td>
            <i onClick={onRemove} className={"fas fa-trash"}></i>
            <i data-toggle="modal" data-target="#editCustomer" 
            onClick = {onClick}
            className={"fas fa-pen"}></i>
        </td>
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
            <td scope="col">Hành động</td>
            <td scope="col"></td>
        </>)
    }, []);

    const [customer, setCustomer]= useState(null);
    const changeCustomer = useCallback((value)=>setCustomer(value),[customer])
    return (<CustomerContext.Provider value={{customer,setCustomer:changeCustomer}}>
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
        <EditModal/>
    </CustomerContext.Provider>
    )
});


export default List;
