import React from 'react';
import { DashboardConstate } from './constate';

const Item = React.memo(({ item }: { item: any }) => {
    return <div className="row">
        <div className="col">{item.id}</div>
        <div className="col">{item.name}</div>
        <div className="col">{item.cost}</div>
    </div>
});

const CustomerBillboard = React.memo(() => {
    const state = DashboardConstate.useReport();
    return (
        <div className="col">
            <div className="row card-header mb-2">
                <div className="col">Mã SKU</div>
                <div className="col">Tên sản phẩm</div>
                <div className="col">Số lượng </div>
                <div className="col">Trạng thái </div>
                <div className="col">Đơn giá</div>
                <div className="col">Tổng giá</div>
            </div>

            {(state.value ? state.value.customers : []).map((item: any) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    )
});


export default CustomerBillboard;
