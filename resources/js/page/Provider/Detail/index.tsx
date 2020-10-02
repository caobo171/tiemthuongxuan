import React , {useCallback} from 'react';
import {useParams} from 'react-router-dom';
import ProductList from '../../../components/Product/List';
import { BILL_STATUS } from '../../../Constants';
import { ProviderDetail } from './constate';
import { RawBill, RawImportBill } from '../../../store/types';
import {Link } from 'react-router-dom';
import moment from 'moment';

interface Props {
    item: RawImportBill
}
const Item = React.memo(({ item }: Props) => {
    return <div className="row">
        <div className="col">{item.id}</div>
        <div className="col">{moment(item.created_at).format('DD/MM/YYYY')}</div>
        <div className="col">{item.provider_id}</div>
        <div className="col">{item.status} </div>
        <div className="col">{item.cost}</div>
        <Link className="col" to={`/importbill/detail/${item.id}`}>View</Link>
    </div>
});


const Detail = React.memo(() => {

    const state = ProviderDetail.useStateProvider();

    return (
        <>{state.value && (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Create New Order</h1>
        </div>
        <div className="row mb-4">
                <div className="card shadow col">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Thông tin khách hàng</h6>
                    </div>
                    <div className="card-body">
                        <div className="col">
                            <div className="h6">{state.value.provider.name}</div>
                            <div className="text-xs">{state.value.provider.phone}</div>
                        </div>
                    </div>
                </div>
        </div>
        <div className="row">
            <div className="card shadow col">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between row">
                    <div className="col">Mã đơn hàng</div>
                    <div className="col">Ngày tạo đơn</div>
                    <div className="col">Khách hàng</div>
                    <div className="col">Trạng thái </div>
                    <div className="col">Giá</div>
                    <div className="col"></div>
                </div>
                <div className="card-body">
                    {(state.value.bills || []).map(item => {
                        return <Item item={item} key={item.id} />})
                    }
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
