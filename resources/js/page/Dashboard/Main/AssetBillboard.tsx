import React, { useMemo } from 'react';
import { DashboardConstate } from './constate';
import TableList from '../../../components/TableList';
import { Link } from 'react-router-dom';
import { money } from '../../../service/utils';

const Item = React.memo(({ item }: { item: any }) => {
    return <>
        <td>{item.name}</td>
        <td>{money(item.expense)}</td>
        <td>{money(item.cost)}</td>
    </>
});

const AssetBillboard = React.memo(() => {
    const state = DashboardConstate.useReport();
    const header = useMemo(()=>(
        <>
            <td>Tài sản</td>
            <td>Tổng tiền khấu hao</td>
            <td>Tổng tiền</td>
        </>
    ),[]);
    return (
        <>
            <TableList
                header = {header}
                data={state.value ? state.value.assets.sort((a,b)=>(b.expense - a.expense)) : []}
                rowItem={Item}
            />
        </>
    )
});


export default AssetBillboard;
