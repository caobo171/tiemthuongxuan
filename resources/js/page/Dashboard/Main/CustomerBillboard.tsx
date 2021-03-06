import React, { useMemo } from 'react';
import { DashboardConstate } from './constate';
import TableList from '../../../components/TableList';
import { Link } from 'react-router-dom';
import { money } from '../../../service/utils';

const Item = React.memo(({ item }: { item: any }) => {
    return <>
        <td>{item.name}</td>
        <td>{money(item.cost)}</td>
        <td>{item.bills}</td>
        <td>{money(item.pending)}</td>
        <td>
            <Link to={`/customer/detail/${item.id}`}>View</Link>
        </td>
    </>
});

const CustomerBillboard = React.memo(() => {
    const state = DashboardConstate.useReport();
    const header = useMemo(()=>(
        <>
            <td>Khách hàng</td>
            <td>Tổng giá trị</td>
            <td>Số đơn hàng</td>
            <td>Tiền pending</td>
            <td></td>
        </>
    ),[]);
    return (
        <>
            <TableList
                header = {header}
                data={state.value ? state.value.customers.sort((a,b)=>(b.cost-a.cost)) : []}
                rowItem={Item}
            />
        </>
    )
});


export default CustomerBillboard;
