import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useAsyncFn, useThrottle } from 'react-use';
import { RawProduct, RawItem } from '../../store/types';
import CreateProductModal from './CreateProductModal';

interface Props {
    onClickItem : (value: RawProduct)=> void
}

const ProductListPopUp = React.memo(({ onClickItem }: Props) => {
    const [text, setText] = useState('');
    const throttledText = useThrottle(text, 500);
    const onChangeHandle = useCallback((e)=>{
        setText(e.target.value)
    },[text])

    const [state, fetch] = useAsyncFn(async () => {
        if(text.replace(/\s/g, '') === ''){
            const res = await Axios.get('/api/product');
            return res.data;
        }
        const res = await Axios.post('/api/product/search',{q: throttledText});
        return res.data;
    }, [throttledText]);

    useEffect(()=>{
        fetch();
    },[fetch])

    useEffect(()=>{
        //@ts-ignore
        window.$("#productDropDown").on("click", ()=>{
            fetch();
        })
        return ()=>{
            //@ts-ignore
            window.$("#productDropDown").off("click");
        }
    }, [])

    return (
        <>
            <div className="input-group">
                <input className="form-control dropdown-toggle" id="productDropDown"
                    placeholder="Search for..."
                    value={text}
                    onChange={onChangeHandle}
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                </input>
            </div>
            <div className="dropdown-menu dropdown-menu-right animated--grow-in" aria-labelledby="productDropDown">
                {
                    state.loading ? (
                        <div>Loading ...</div>
                    ) : (
                            <><a className="dropdown-item" data-toggle="modal" data-target="#createProductModal">Thêm sản phẩm mới</a>
                                    {(state.value || []).map(item => (
                                        <a
                                            key={item.id}
                                            className="dropdown-item"
                                            onClick={() => onClickItem(item)}
                                            id={item.id}
                                            data-toggle="modal"
                                            data-target="#createUser`Modal">
                                            {item.name}
                                        </a>
                                    ))}
                                </>
                            )
                    }

                </div>


            <CreateProductModal />
        </>
    )
});


export default ProductListPopUp;
