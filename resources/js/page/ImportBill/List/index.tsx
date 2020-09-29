import Axios from 'axios';
import { useAsync } from 'react-use';
import React from 'react';
import Item from './Item';


const List = React.memo(() => {

    const data = useAsync(async () => {
        const res = await Axios.get('/api/importbill');
        return res.data;
    })
    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Order</h1>
        </div>
        <div className="row">
            <div className="card shadow col">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between row">
                    <div className="col">Mã đơn hàng</div>
                    <div className="col">Ngày tạo đơn</div>
                    <div className="col">Khách hàng</div>
                    <div className="col">Trạng thái </div>
                    <div className="col">Giá</div>
                </div>
                <div className="card-body">
                    {(data.value || []).map(item => {    
                        return <Item item={item} />})
                    }
                </div>
            </div>
        </div>
    </>
    )
});


export default List;