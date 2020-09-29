import Axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { RawCustomer } from '../../store/types';
import CreateUserModal from './CreateCustomerModal';


interface Props {
    onClickItem: (item: RawCustomer) => void
}

const CustomerListPopUp = React.memo(({ onClickItem }: Props) => {

    const [state, fetch] = useAsyncFn(async () => {
        const res = await Axios.get('/api/customer');
        return res.data;
    }, []);

    useEffect(()=>{

        //@ts-ignore
        window.$("#productDropDown").on("click", ()=>{
            fetch();
        })
        return ()=>{
            //@ts-ignore
            window.$("#productDropDown").off('click');
        }
    }, [])
    return (
        <>
            <div className="input-group">
                <input className="form-control dropdown-toggle" id="customerDropdown"
                    onClick={fetch}
                    placeholder="Search for..."
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                </input>
                <div className="dropdown-menu dropdown-menu-right animated--grow-in" aria-labelledby="customerDropdown">
                    {state.loading ? (
                        <div>Loading ...</div>
                    ) : (<><a className="dropdown-item" data-toggle="modal" data-target="#createUserModal">Thêm mới khách hàng</a>
                        {(state.value || []).map(item => (
                            <a className="dropdown-item"
                                onClick={() => onClickItem(item)}
                                id={item.id}
                                data-toggle="modal"
                                data-target="#createUser`Modal">
                                {item.name}-{item.phone}
                            </a>))}</>)}
                </div>
            </div>

            <CreateUserModal />
        </>
    )
});


export default CustomerListPopUp;