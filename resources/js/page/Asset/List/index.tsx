import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useMemo, useState, useCallback, useContext } from 'react';
import { RawAsset } from '../../../store/types';
import CreateModal from '../../../components/Asset/CreateModal';
import { SearchTableList } from '../../../components/TableList';
import moment from 'moment';
import Fetch from '../../../service/Fetch';
import { money } from '../../../service/utils';
import { AssetContext } from '../../../components/Asset/EditModal';
import EditModal from '../../../components/Asset/EditModal';
import { toast } from 'react-toastify';
import {Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
interface Props {
    item: RawAsset
}
const RowItem = React.memo(({ item }: Props) => {
    const {setAsset, reload} = useContext(AssetContext);
    const onRemove = useCallback(async ()=>{
        reload && reload();
        if (window.confirm("Are you sure to remove?")){
            const res = await Fetch.delete(`api/asset/${item.id}`);
            if(res.data){
                toast.success("Delete successful");
            }
        }
    },[item])

    const onClick = useCallback(()=> setAsset(item), [item]);
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.cycle} ngày</td>
        <td>{moment(item.created_at).format('DD-MM-YYYY')}</td>
        <td>{item.description}</td>
        <td>{money(item.cost)}</td>
        <td>
            <div className="dropdown">
                <i className="fas fa-ellipsis-h"></i>
                <div className="dropdown-menu">
                    <div className= "dropdown-item" onClick={onRemove}>Xoá</div>
                    <div className= "dropdown-item" data-toggle="modal" data-target="#editAsset"  onClick={onClick}>Sửa</div>
                </div>
            </div>
        </td>
    </>
});



const List = React.memo(() => {

    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Tên tài sản</td>
            <td scope="col">Vòng đời</td>
            <td>Ngày tạo</td>
            <td scope="col">Mô tả </td>
            <td scope="col">Giá</td>
            <td style={{width: 120}}>
            </td>
        </>)
    }, [ window.location.search]);

    const [val, setVal] = useState(0);
    const reload = useCallback(()=>{
        setVal(Math.random());
    },[val])

    const [asset, setAsset ] = useState(null);
    const changeAsset = useCallback((value)=>setAsset(value), [asset])

    return (<AssetContext.Provider value={{asset, setAsset: changeAsset, reload:reload}}>
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
