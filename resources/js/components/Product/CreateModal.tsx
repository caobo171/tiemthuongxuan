import React, { useRef } from 'react';
import { useAlert } from 'react-alert';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import Fetch from '../../service/Fetch';
const CreateProductModal = React.memo(()=>{

    const nameRef = useRef<HTMLInputElement>(null);
    const skuRef = useRef<HTMLInputElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const alert = useAlert();

    const [state, createProduct] = useAsyncFn(async()=>{
        //@ts-ignore
        const name = nameRef.current.value;
        //@ts-ignore
        const sku = skuRef.current.value;
        //@ts-ignore
        const cost = Number(costRef.current.value);
        //@ts-ignore
        const description = descriptionRef.current.value;

        const res = await Fetch.post('api/product',{
            name, sku, cost, description
        });
        if(res.data){
            alert.show("Create Product Successful", {type: 'success'});
        }
        return res.data;
    },[]); 

    return(
        <>
        <div className="modal fade" id="product" 
            tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Thêm sản phẩm</h5>
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
                                <label>Cost </label>
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


export default CreateProductModal;