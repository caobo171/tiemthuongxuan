import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useMemo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ProductReportConstate } from './constate';
import TableList from '../../../components/TableList';
import { money } from '../../../service/utils';


interface Props {
    item: any
}
const Item = React.memo(({ item }: Props) => {
    return <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.expense}</td>
        <td>{money(item.cost)}</td>
        <td>
            <Link  to={`/product/detail/${item.id}`}>View</Link>
        </td>
    </>
});

const List = React.memo(() => {

    const state = ProductReportConstate.useProductGroups();

    const header = useMemo(()=>(
        <>
            <td>ID</td>
            <td>Mặt hàng</td>
            <td>Tổng vốn</td>
            <td>Tổng lợi nhuận</td>
            <td></td>
        </>
    ),[])

    return (
        <div className="col">
            <div className="card shadow">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Mặt hàng nổi bật</h6>
                </div>
                <TableList
                    header = {header}
                    data = {state.value ? state.value.groups : []}
                    rowItem = {Item}
                />
            </div>
        </div>
    )
});


export default List;
