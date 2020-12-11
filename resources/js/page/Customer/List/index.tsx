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
import { Dropdown } from 'react-bootstrap';
import EditModal from '../../../components/Customer/EditModal';
import { toast } from 'react-toastify';

interface Props {
    item: RawCustomer
}
const Item = React.memo(({ item }: Props) => {
    const {setCustomer, reload} = useContext(CustomerContext);
    const onRemove = useCallback(async ()=>{
        reload && reload();
        if (window.confirm("Are you sure to remove?")){
            const res = await Fetch.delete(`api/customer/${item.id}`);
            if(res.data){
                toast.success("Delete successful !");
            }
        }
    },[item])
    const onClick = useCallback(()=>{
        setCustomer(item)
    },[item])
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.phone} </td>
        <td>{item.email}</td>
        <td>{item.platform}</td>
        <td>
            <div className="dropdown">
                <i className="fas fa-ellipsis-h"></i>
                <div className="dropdown-menu">
                    <div className= "dropdown-item" onClick={onRemove}>Xoá</div>
                    <div className= "dropdown-item" data-toggle="modal" data-target="#editCustomer" onClick={onClick}>Sửa</div>
                    <Link className= "dropdown-item" to={`/customer/detail/${item.id}`}>View</Link>
                </div>
            </div>
        </td>
    </>
});

const List = React.memo(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    const [state,setState] = useState(0);
    const reload = useCallback(()=>{
        setState(Math.random());
    },[state])
    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Tên khách hàng</td>
            <td scope="col">Số điện thoại</td>
            <td scope="col">Email</td>
            <td scope="col">Nền tảng</td>
            <td scope="col" style={{width: 100}}></td>
        </>)
    }, [state,  window.location.search]);

    const [customer, setCustomer]= useState(null);
    const changeCustomer = useCallback((value)=>setCustomer(value),[customer])
    return (<CustomerContext.Provider value={{customer,setCustomer:changeCustomer, reload:reload}}>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Khách hàng</h1>

            <a data-toggle="modal" data-target="#customer" className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white">Thêm khách hàng</span></a>
        </div>
        <div className="row">
            <SearchTableList
                title="Tất cả khách hàng"
                mainUrl={'api/customer'}
                redirectUrl={'customers'}
                rowItem={Item}
                header={header}
                reload={state}
                placeholder={'Tìm kiếm khách hàng ...'}
            />
        </div>
        <CreateCustomerModal reload={reload}/>
        <EditModal reload={reload}/>
    </CustomerContext.Provider>
    )
});


export default List;
