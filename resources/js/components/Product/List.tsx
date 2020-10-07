import React, { useMemo } from 'react';
import { RawItem } from '../../store/types';
import Item from './Item';
import TableList from '../TableList';


const SelectedList = React.memo(({ items }: { items: RawItem[] }) => {

    const header = useMemo(() => (
        <>
            <td>Mã SKU</td>
            <td>Tên sản phẩm</td>
            <td>Số lượng </td>
            <td>Trạng thái </td>
            <td>Đơn giá</td>
            <td>Tổng giá</td>
        </>
    ), []);

    return (<div className="card shadow">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Thông tin sản phẩm</h6>
        </div>
        <TableList
            header={header}
            data = {items}
            rowItem= {Item}
        />
    </div>
    )
});


export default SelectedList;
