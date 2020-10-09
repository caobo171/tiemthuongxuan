import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useMemo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RawCustomer, RawProvider } from '../../../store/types';
import { SearchTableList } from '../../../components/TableList';
import CreateProviderModal from '../../../components/Provider/CreateModal';

interface Props {
    item: RawProvider
}
const Item = React.memo(({ item }: Props) => {
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>
            <Link to={`/provider/detail/${item.id}`}>View</Link>
        </td>
    </>
});

const List = React.memo(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Tên nhà cung cấp</td>
            <td scope="col">Số điện thoại</td>
            <td scope="col">Email</td>
            <td scope="col"></td>
        </>)
    }, []);

    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Nhà cung cấp</h1>

            <a data-toggle="modal" data-target="#provider" className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white">Thêm nhà cung cấp</span></a>
        </div>
        <div className="row">
            <SearchTableList
                title="Tất cả nhà cung cấp"
                query={q}
                searchUrl={'api/provider/search'}
                mainUrl={'api/provider'}
                redirectUrl={'providers'}
                rowItem={Item}
                header={header}
                placeholder={'Tìm kiếm nhà cung cấp ...'}
            />
        </div>
        <CreateProviderModal/>
    </>
    )
});


export default List;
