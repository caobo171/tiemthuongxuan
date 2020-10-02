import Axios from 'axios';
import { useAsync } from 'react-use';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RawCustomer } from '../../../store/types';

interface Props {
    item: RawCustomer
}
const Item = React.memo(({ item }: Props) => {
    return <div className="row">
        <div className="col">{item.id}</div>

        <div className="col">{item.name}</div>
        <div className="col">{item.phone || item.email} </div>
        <div className="col">{item.platform}</div>
        <Link className="col" to={`/customer/detail/${item.id}`}>View</Link>
    </div>
});

const List = React.memo(() => {

    const data = useAsync(async () => {
        const res = await Axios.get('/api/customer');

        // const res2 = await Axios.post('/api/importbill/search', {
        //     q: '9'
        // });
        // console.log(res2)
;        return res.data;
    });

    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Order</h1>
        </div>
        <div className="row">
            <div className="card shadow col">
                <div className="input-group mb-2 mt-2">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
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
    </>
    )
});


export default List;
