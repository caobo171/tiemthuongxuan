import Axios from 'axios';
import { useAsync } from 'react-use';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ProductReportConstate } from './constate';


interface Props {
    item: any
}
const Item = React.memo(({ item }: Props) => {
    return <div className="row">
        <div className="col">{item.id}</div>
        <div className="col">{item.name}</div>
        <div className="col">{item.cost}</div>
    </div>
});

const List = React.memo(() => {

    const state = ProductReportConstate.useProductGroups();

    return (<>
            <div className="card shadow col">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between row">
                    <div className="col">Mã đơn hàng</div>
                    <div className="col">Mat hang</div>
                    <div className="col">Loi nhuan</div>
                </div>
                <div className="card-body">
                    {(state.value ? state.value.groups : []).map((item:any) => {
                        return <Item item={item} key={item.id} />})
                    }
                </div>
            </div>
    </>
    )
});


export default List;
