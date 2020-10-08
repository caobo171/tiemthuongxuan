import React , {useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import ProductList from '../../../components/Product/List';
import { BILL_STATUS } from '../../../Constants';
import { ProviderDetail } from './constate';
import { RawBill, RawImportBill } from '../../../store/types';
import {Link } from 'react-router-dom';
import moment from 'moment';
import TableList from '../../../components/TableList';

interface Props {
    item: RawImportBill
}
const Item = React.memo(({ item }: Props) => {
    return <>
        <td>{item.id}</td>
        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
        <td>{item.provider_id}</td>
        <td>{item.status} </td>
        <td>{item.cost}</td>
        <td>
            <Link className="col" to={`/importbill/detail/${item.id}`}>View</Link>
        </td>
    </>
});


const Detail = React.memo(() => {

    const state = ProviderDetail.useStateProvider();
    const header = useMemo(()=>(
        <>
            <td>Mã đơn hàng</td>
            <td>Ngày tạo đơn</td>
            <td>Mã nhà cung cấp</td>
            <td>Trạng thái </td>
            <td>Giá</td>
            <td></td>
        </>
    ),[])
    return (
        <>{state.value && (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Nhà cung cấp</h1>
        </div>
        <div className="row mb-4">
            <div className="col">
                <div className="card shadow">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Thông tin nhà cung cấp</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-3">
                                <h4 className="h4">{state.value.provider.name}</h4>
                            </div>
                            <div className="cocol-xl-9">
                                <div className="text-xs"><b>Số điện thoại: </b>{state.value.provider.phone}</div>
                                <div className="text-xs"><b>Email: </b>{state.value.provider.email}</div>
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
    return <ProviderDetail.Provider providerId={id}>
        <Detail />
    </ProviderDetail.Provider>
})

export default __Detail;
