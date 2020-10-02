import React, { useCallback, useEffect, useState } from 'react';
import { useAsyncFn, useThrottle } from 'react-use';
import CreateProviderModal from './CreateProviderModal';
import Axios from 'axios';
import { RawProvider } from '../../store/types';

interface Props {
    onClickItem: (value: RawProvider) => void
}

const ProviderListPopUp = React.memo(({ onClickItem }: Props) => {
    const [text, setText] = useState('');
    const throttledText = useThrottle(text, 1000);
    const onChangeHandle = useCallback((e)=>{
        setText(e.target.value)
    },[text])

    const [state, fetch] = useAsyncFn(async () => {
        if(text.replace(/\s/g, '') === ''){
            const res = await Axios.get('/api/provider');
            return res.data;
        }
        const res = await Axios.post('/api/provider/search',{q: throttledText});
        return res.data;
    }, [throttledText]);

    useEffect(()=>{
        fetch();
    },[fetch])

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
                    value={text}
                    onChange={onChangeHandle}
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