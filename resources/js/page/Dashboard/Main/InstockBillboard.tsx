import React, { useMemo } from 'react';
import { DashboardConstate } from './constate';
import TableList from '../../../components/TableList';
import { Link } from 'react-router-dom';
import { money } from '../../../service/utils';

const Item = React.memo(({ item }: { item: any }) => {
    return <>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{money(item.remain_stock)}</td>
        <td>
            <Link to={`/product/detail/${item.id}`}>View</Link>
        </td>
    </>
});

const InstockBillboard = React.memo(() => {
    const state = DashboardConstate.useReport();
    const header = useMemo(()=>(
        <>
            <td>Sản phẩm</td>
            <td>SL tồn kho</td>
            <td>Tiền tồn kho</td>
            <td></td>
        </>
    ),[]);
    return (
        <>
            <TableList
                header = {header}
                data={state.value ? state.value.products.sort((a,b)=>(b.remain_stock - a.remain_stock)) : []}
                rowItem={Item}
            />
        </>
    )
});


export default InstockBillboard;
