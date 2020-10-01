import Axios from 'axios';
import { useAsync } from 'react-use';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface Props {
    item: any
}
const Item = React.memo(({ item }: Props) => {
    return <div className="row">
        <div className="col">{item.id}</div>
        <div className="col">{moment(item.created_at).format('DD/MM/YYYY')}</div>
        <div className="col">{item.user_id}</div>
        <div className="col">{item.status} </div>
        <div className="col">{item.cost}</div>
        <Link className="col" to={`bill/detail/${item.id}`}>View</Link>
    </div>
});

const List = React.memo(() => {

    const data = useAsync(async () => {
        const res = await Axios.get('/api/bill');
        return res.data;
    });
    
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
                    <div className="col"></div>
                </div>
                <div className="card-body">
                    {(data.value || []).map(item => {    
                        return <Item item={item} key={item.id} />})
                    }
                </div>
            </div>
        </div>
    </>
    )
});


export default List;