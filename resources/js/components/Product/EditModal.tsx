import React, { useRef, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useAsyncFn } from 'react-use';
import Fetch from '../../service/Fetch';
import { RawProduct } from '../../store/types';

interface Props {
    reload?:()=>void
}

const EditProductModal = React.memo(({reload}: Props)=>{
    const {product} = useContext(ProductContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const skuRef = useRef<HTMLInputElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(!nameRef.current || !skuRef.current || !costRef.current || !descriptionRef.current  || !product){
            return;
        }
        //@ts-ignore
        nameRef.current?.value = product.name;
        //@ts-ignore
        skuRef.current?.value = product.sku;
        //@ts-ignore
        costRef.current?.value = product.cost;
        //@ts-ignore
        descriptionRef.current?.value = product.description;
    },[nameRef, skuRef, costRef, descriptionRef, product])

    const [state, createProduct] = useAsyncFn(async()=>{
        if(!product) return;
        //@ts-ignore
        const name = nameRef.current.value;
        //@ts-ignore
        const sku = skuRef.current.value;
        //@ts-ignore
        const cost = Number(costRef.current.value);
        //@ts-ignore
        const description = descriptionRef.current.value;

        const res = await Fetch.put(`api/product/${product.id}`,{
            name, sku, cost, description
        });
        return res.data;
    },[product]);


    useEffect(()=>{
        reload && reload();
        if(state.value){
            toast.success("Edit product successful");
            return ;
        }
        if(state.error){
            toast.success(state.error.message);
        }
    },[state])

    return(
        <>
        <div className="modal fade" id="editProduct"
            tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit sản phẩm</h5>
                        <button className="close" type="button"
                            data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="form-group col">
                                <label>Tên sản phẩm</label>
                                <input className="form-control" ref={nameRef}></input>
                            </div>
                            <div className="form-group col">
                                <label>Mã sản phẩm/SKU</label>
                                <input className="form-control" ref={skuRef}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label>Giá bán </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">đ</span>
                                    </div>
                                        <input type="string" ref={costRef} className="form-control" aria-label="Amount (to the nearest dollar)"/>
                                    </div>
                                </div>
                            <div className="form-group col">
                                <label>Ghi chú</label>
                                <input className="form-control" ref={descriptionRef}></input>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <input title={"Tạo"} type="submit" className="btn btn-primary" data-dismiss="modal" onClick={createProduct}></input>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
});


export default EditProductModal;

export const ProductContext = React.createContext<{
    product: RawProduct|null,
    setProduct:(value: RawProduct)=>void,
    reload?:()=>void
}>({
    product: null,
    setProduct: ()=>{}
});