import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useMemo } from 'react';
import { RawAsset } from '../../../store/types';
import CreateAssetModal from '../../../components/Asset/CreateAssetModal';
import { SearchTableList } from '../../../components/TableList';


interface Props {
    item: RawAsset
}
const RowItem = React.memo(({ item }: Props) => {
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.cycle} ngày</td>
        <td>{item.description}</td>
        <td>{item.cost}</td>
    </>
});



const List = React.memo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Tên tài sản</td>
            <td scope="col">Vòng đời</td>
            <td scope="col">Mô tả </td>
            <td scope="col">Giá</td>
        </>)
    }, []);

    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Tài sản</h1>

            <a data-toggle="modal" data-target="#createAssetModal" className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white-50">Thêm tài sản</span></a>
        </div>
        <div className="row">
            <SearchTableList
                title="Tất cả tài sản"
                query={q}
                searchUrl={'api/asset/search'}
                mainUrl={'api/asset'}
                redirectUrl={'assets'}
                rowItem={RowItem}
                header={header}
                placeholder={'Tìm kiếm tài sản ...'}
            />
        </div>
        <CreateAssetModal />
    </>
    )
});


export default List;
