import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useRef, useEffect } from 'react';
import { RawAsset } from '../../../store/types';
import { useHistory } from "react-router-dom";
import CreateAssetModal from '../../../components/Asset/CreateAssetModal';


interface Props {
    item: RawAsset
}
const Item = React.memo(({ item }: Props) => {
    return <div className="row">
        <div className="col">{item.id}</div>
        <div className="col">{item.name}</div>
        <div className="col">{item.cycle} </div>
        <div className="col">{item.description}</div>
		<div className="col">{item.cost}</div>
    </div>
});

const List = React.memo(() => {

    const searchRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    useEffect(()=>{
        if (searchRef.current){
            searchRef.current.addEventListener('keypress',(e)=>{
                if(e.code==='Enter'){
                    //@ts-ignore
                    history.push("/assets?q="+e.target.value);
                }
            })
        }
        return ()=>{
        }
    },[history, searchRef])

    const data = useAsync(async () => {
        if(q){
            const res = await Axios.post('/api/asset/search',{q});
            return res.data
        }
        const res = await Axios.get('/api/asset');
        return res.data;
    },[q]);

    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Khach hang</h1>

            <div className="form-group">
                <div className="btn btn-primary" data-toggle="modal" data-target="#createAssetModal">Them Asset</div>
            </div>
        </div>
        <div className="row">
            <div className="card shadow col">
                <div className="input-group mb-2 mt-2">
                    <input type="text"
                    ref={searchRef}
                    className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between row">
                    <div className="col">Mã đơn hàng</div>
                    <div className="col">Ngày tạo đơn</div>
                    <div className="col">Khách hàng</div>
                    <div className="col">Trạng thái </div>
                    <div className="col">Giá</div>
                    <div className="col"></div>
                </div>
                <div className="card-body">
                    {(data.value || []).map(item => {
                        return <Item item={item} key={item.id} />})
                    }
                </div>
            </div>
        </div>
		<CreateAssetModal/>
    </>
    )
});


export default List;
