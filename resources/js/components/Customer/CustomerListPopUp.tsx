import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { RawCustomer } from '../../store/types';
import CreateUserModal from './CreateCustomerModal';
import {useThrottle} from 'react-use';


interface Props {
    onClickItem: (item: RawCustomer) => void
}

const CustomerListPopUp = React.memo(({ onClickItem }: Props) => {

    const [text, setText] = useState('');
    const throttledText = useThrottle(text, 500);
    const onChangeHandle = useCallback((e)=>{
        setText(e.target.value)
    },[text])
    const [state, fetch] = useAsyncFn(async () => {
        if(text.replace(/\s/g, '') === ''){
            const res = await Axios.get('/api/customer');
            return res.data;
        }
        const res = await Axios.post('/api/customer/search',{q: throttledText});
        return res.data;
    }, [throttledText]);

    useEffect(()=>{
        fetch();
    },[fetch])

    useEffect(()=>{

        //@ts-ignore
        window.$("#customerDropdown").on("click", ()=>{
            fetch();
        })
        return ()=>{
            //@ts-ignore
            window.$("#customerDropdown").off('click');
        }
    }, [])
    return (
        <>
            <div className="row">
                <input className="form-control dropdown-toggle" id="customerDropdown"
                    placeholder="Search for..."
                    value={text}
                    onChange={onChangeHandle}
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                </input>
                <div className="dropdown-menu dropdown-menu-right animated--grow-in" aria-labelledby="customerDropdown">
                    {state.loading ? (
                        <div>Loading ...</div>
                    ) : (<><a className="dropdown-item" data-toggle="modal" data-target="#createUserModal">Thêm mới khách hàng</a>
                        {(state.value || []).map(item => (
                            <a className="dropdown-item"
                                key={item.id}
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