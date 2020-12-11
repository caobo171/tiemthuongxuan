import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RawCustomer, RawProvider } from '../../../store/types';
import { SearchTableList } from '../../../components/TableList';
import CreateProviderModal from '../../../components/Provider/CreateModal';
import { ProviderContext } from '../../../components/Provider/EditModal';

import Fetch from '../../../service/Fetch';
import EditModal from '../../../components/Provider/EditModal';
import { toast } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';

interface Props {
    item: RawProvider
}
const Item = React.memo(({ item }: Props) => {
    const { setProvider,reload } = useContext(ProviderContext);
    const onRemove = useCallback(async () => {
        reload && reload();
        if (window.confirm("Are you sure to remove?")) {
            const res = await Fetch.delete(`api/provider/${item.id}`);
            if (res.data) {
                toast.success("Delete successful", { type: 'success' });
            }
        }
    }, [item])
    const onClick = useCallback(() => {
        setProvider(item)
    }, [])
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>
            <div className="dropdown">
                <i className="fas fa-ellipsis-h"></i>
                <div className="dropdown-menu">
                    <div className= "dropdown-item" onClick={onRemove}>Xoá</div>
                    <div className= "dropdown-item" data-toggle="modal" data-target="#editProvider"  onClick={onClick}>Sửa</div>
                    <Link className= "dropdown-item" to={`/provider/detail/${item.id}`}>Chi tiết</Link>
                    
                </div>
            </div>
        </td>
    </>
});

const List = React.memo(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    const [state, setState] = useState(0);
    const reload = useCallback(() => {
        setState(Math.random());
    }, [state])
    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Tên nhà cung cấp</td>
            <td scope="col">Số điện thoại</td>
            <td scope="col">Email</td>
            <td>Hành động</td>
        </>)
    }, [state,  window.location.search]);

    const [provider, setProvider] = useState(null);
    const changeProvider = useCallback((value) => setProvider(value), [])

    return (<ProviderContext.Provider value={{ provider, setProvider: changeProvider , reload:reload }}>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Nhà cung cấp</h1>

            <a data-toggle="modal" data-target="#provider" className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white">Thêm nhà cung cấp</span></a>
        </div>
        <div className="row">
            <SearchTableList
                title="Tất cả nhà cung cấp"
                mainUrl={'api/provider'}
                redirectUrl={'providers'}
                rowItem={Item}
                header={header}
                reload={state}
                placeholder={'Tìm kiếm nhà cung cấp ...'}
            />
        </div>
        <CreateProviderModal reload={reload} />
        <EditModal reload={reload} />
    </ProviderContext.Provider>
    )
});


export default List;
