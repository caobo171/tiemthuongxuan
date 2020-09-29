import Axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { RawProduct } from '../../store/types';
import CreateProductModal from './CreateProductModal';

interface Props {
    onClickItem : (value: RawProduct)=> void
}

const ProductListPopUp = React.memo(({ onClickItem }: Props) => {

    const [state, fetch] = useAsyncFn(async () => {
        const res = await Axios.get('/api/product');
        return res.data;
    }, []);

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
                <input className="form-control dropdown-toggle" id="productDropDown"
                    placeholder="Search for..."
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                </input>
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