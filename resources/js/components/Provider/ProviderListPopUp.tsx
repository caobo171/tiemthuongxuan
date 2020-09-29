import React, { useCallback, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import CreateProviderModal from './CreateProviderModal';
import Axios from 'axios';
import { RawProvider } from '../../store/types';

interface Props {
    onClickItem: (value: RawProvider) => void
}

const ProviderListPopUp = React.memo(({ onClickItem }: Props) => {

    const [state, fetch] = useAsyncFn(async () => {
        const res = await Axios.get('/api/provider');
        return res.data;
    }, []);
    
    useEffect(()=>{
        //@ts-ignore
        window.$("#providerDropDown").on("click", ()=>{
            fetch();
        })
        return ()=>{
            //@ts-ignore
            window.$("#providerDropDown").off('click');
        }
    }, [])


    return (
        <>
            <div className="row">
                <input className="form-control dropdown-toggle"  id="providerDropDown"
                    placeholder="Search for..."
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                </input>
                <div className="dropdown-menu dropdown-menu-right animated--grow-in" aria-labelledby="productDropDown">
                    {
                        state.loading ? (
                            <div>Loading ...</div>
                        ) : (<> <a className="dropdown-item" data-toggle="modal" data-target="#createProviderModal">Thêm mới nhà cung cấp </a>
                            {(state.value || []).map(item => (
                                <a className="dropdown-item"
                                    key={item.id}
                                    onClick={() => onClickItem(item)}
                                    id={item.id}>
                                    {item.name}-{item.phone}
                                </a>
                            ))}</>)}
                </div>
            </div>

            <CreateProviderModal />
        </>
    )
});


export default ProviderListPopUp;