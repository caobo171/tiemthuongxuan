import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useMemo, useState, useCallback, useContext } from 'react';
import { RawAsset } from '../../../store/types';
import CreateModal from '../../../components/Asset/CreateModal';
import { SearchTableList } from '../../../components/TableList';
import moment from 'moment';
import Fetch from '../../../service/Fetch';
import { useAlert } from 'react-alert';
import { money } from '../../../service/utils';
import { AssetContext } from '../../../components/Asset/EditModal';
import EditModal from '../../../components/Asset/EditModal';

interface Props {
    item: RawAsset
}
const RowItem = React.memo(({ item }: Props) => {
    const alert = useAlert();
    const onRemove = useCallback(async ()=>{
        if (window.confirm("Are you sure to remove?")){
            const res = await Fetch.delete(`api/asset/${item.id}`);
            if(res.data){
                alert.show("Delete successful", {type: 'success'});
            }
        }
    },[item])

    const {setAsset} = useContext(AssetContext);
    const onClick = useCallback(()=> setAsset(item), [item]);
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.cycle} ngày</td>
        <td>{moment(item.created_at).format('DD-MM-YYYY')}</td>
        <td>{item.description}</td>
        <td>{money(item.cost)}</td>
        <td>
            <i onClick={onRemove} className={"fas fa-trash"}></i>
            <i data-toggle="modal" data-target="#editAsset" 
            onClick = {onClick}
            className={"fas fa-pen"}></i>
        </td>
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
            <td>Ngày tạo</td>
            <td scope="col">Mô tả </td>
            <td scope="col">Giá</td>
            <td>
            </td>
        </>)
    }, []);

    const [val, setVal] = useState(0);
    const reload = useCallback(()=>{
        setVal(Math.random());
    },[val])

    const [asset, setAsset ] = useState(null);
    const changeAsset = useCallback((value)=>setAsset(value), [asset])

    return (<AssetContext.Provider value={{asset, setAsset: changeAsset}}>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Tài sản</h1>

            <a data-toggle="modal" data-target="#createAssetModal" className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white">Thêm tài sản</span></a>
        </div>
        <div className="row">
            <SearchTableList
                reload={val}
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
        <CreateModal reload={reload}/>
        <EditModal reload={reload}/>
    </AssetContext.Provider>
    )
});


export default List;
