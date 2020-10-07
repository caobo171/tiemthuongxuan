import React, { useMemo } from 'react';
import { DashboardConstate } from './constate';
import TableList from '../../../components/TableList';

const Item = React.memo(({ item }: { item: any }) => {
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.cost}</td>
    </>
});

const CustomerBillboard = React.memo(() => {
    const state = DashboardConstate.useReport();
    const header = useMemo(()=>(
        <>
            <td>ID</td>
            <td>Khách hàng</td>
            <td>Số đơn hàng</td>
            <td>Tổng giá trị</td>
            <td>Giá trị mỗi đơn</td>
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
