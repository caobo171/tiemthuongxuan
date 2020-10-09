import React , {useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import ProductList from '../../../components/Product/List';
import { BILL_STATUS } from '../../../Constants';
import { CustomerDetail } from './constate';
import { RawBill } from '../../../store/types';
import {Link } from 'react-router-dom';
import moment from 'moment';
import TableList from '../../../components/TableList';
import { money } from '../../../service/utils';

interface Props {
    item: RawBill
}
const Item = React.memo(({ item }: Props) => {
    return <>
        <td>{item.id}</td>
        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
        <td>{item.customer_name}</td>
        <td>{item.status} </td>
        <td>{money(item.cost)}</td>
        <td>
            <Link to={`/bill/detail/${item.id}`}>View</Link>
        </td>
    </>
});


const Detail = React.memo(() => {

    const state = CustomerDetail.useStateCustomer();
    const header = useMemo(()=>(
        <>
            <td>Mã đơn hàng</td>
            <td>Ngày tạo đơn</td>
            <td>Khách hàng</td>
            <td>Trạng thái </td>
            <td>Giá</td>
            <td></td>
        </>
    ),[])
    return (
        <>{state.value && (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Khách hàng</h1>
        </div>
        <div className="row mb-4">
            <div className="col">
            <div className="card shadow">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Thông tin khách hàng</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-3">
                                <h4 className="h4">{state.value.customer.name}</h4>
                            </div>
                            <div className="col-xl-9">
                                <div className="text-xs"><b>Số điện thoại: </b>{state.value.customer.phone}</div>
                                <div className="text-xs"><b>Email: </b>{state.value.customer.email}</div>
                                <div className="text-xs"><b>Nền tảng</b>{state.value.customer.platform}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className="row">
            <div className="col">
                <div className="card shadow">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Đơn hàng đã giao dịch</h6>
                    </div>
                    <TableList
                        data={state.value.bills || []}
                        header={header}
                        rowItem = {Item}
                    />
                </div>
            </div>
        </div>
    </>)}</>);
});


const __Detail = React.memo(() => {
    const {id} = useParams();
    return <CustomerDetail.Provider customerId={id}>
        <Detail />
    </CustomerDetail.Provider>
})

export default __Detail;
