import React, { useMemo } from 'react';
import { DashboardConstate } from './constate';
import TableList from '../../../components/TableList';
import { Link } from 'react-router-dom';

const Item = React.memo(({ item }: { item: any }) => {
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.cost}</td>
        <td>{item.bills}</td>
        <td>{item.pending}</td>
        <td>{((item.cost + item.pending)/item.bills).toFixed(2)}</td>
        <td>
            <Link to={`/customer/detail/${item.id}`}>View</Link>
        </td>
    </>
});

const CustomerBillboard = React.memo(() => {
    const state = DashboardConstate.useReport();
    const header = useMemo(()=>(
        <>
            <td>ID</td>
            <td>Khách hàng</td>
            <td>Tổng giá trị</td>
            <td>Số đơn hàng</td>
            <td>Tiền pending</td>
            <td>Giá trị mỗi đơn</td>
            <td></td>
        </>
    ),[]);
    return (
        <>
            <TableList
                header = {header}
                data={state.value ? state.value.customers : []}
                rowItem={Item}
            />
        </>
    )
});


export default CustomerBillboard;
