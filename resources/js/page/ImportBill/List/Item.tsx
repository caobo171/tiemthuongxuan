import React from 'react';
import { RawBill } from '../../../store/types';
import moment from 'moment';

interface Props {
    item: RawBill
}

const Item = React.memo(({ item }: Props) => {
    return (<div className="row">
        <div className="col">{item.id}</div>
        <div className="col">{moment(item.created_at).format('DD/MM/YYYY')}</div>
        <div className="col">{item.customer_id}</div>
        <div className="col">{item.status} </div>
        <div className="col">{item.cost}</div>
    </div>)
});

export default Item;