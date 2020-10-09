import React, { useRef, useCallback, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import Fetch from '../../service/Fetch';
import { useAlert } from 'react-alert';
import { PLATFORMS } from '../../Constants';

interface Props {
    reload?: ()=>void
}

const CreateAssetModal = React.memo(({reload}: Props)=>{

    const nameRef = useRef<HTMLInputElement>(null);
    const cycleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const [state, createAsset] = useAsyncFn(async()=>{
        //@ts-ignore
        const name = nameRef.current.value;
        //@ts-ignore
        const cycle = cycleRef.current.value;
        //@ts-ignore
        const description = descriptionRef.current.value;
        //@ts-ignore
        const cost = costRef.current.value;
        //@ts-ignore
        const created_at = dateRef.current.value;
        //@ts-ignore
        const res = await Fetch.post('api/asset',{
            name, cycle, cost, description, created_at
        });

        return res.data
    },[]);

    const alert = useAlert();
    useEffect(()=>{
        reload && reload();
        if(state.value){
            alert.show("Create asset successful", {type: 'success'});
            return ;
        }
        if(state.error){
            alert.show(state.error.message, {type: 'error'});
        }
    },[state])

    return(
        <>
        <div className="modal fade" id="createAssetModal" tabIndex={-1} role="dialog"
        aria-labelledby="create-user-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="create-user-modal">Thêm sản phẩm</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="form-group col">
                                <label>Tên tài sản</label>
                                <input className="form-control" ref={nameRef}></input>
                            </div>
                            <div className="form-group col">
                                <label>Vòng đời (ngày) </label>
                                <input className="form-control"
                                type="number"
                                ref={cycleRef}></input>
                            </div>

                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label>Giá </label>
                                <input className="form-control" ref={costRef}></input>
                            </div>
                            <div className="form-group col">
                                <label>Create Date </label>
                                <input className="form-control" type={'date'} ref={dateRef}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label>Description </label>
                                <textarea className="form-control" ref={descriptionRef}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <input title={"Tạo"} type="submit" className="btn btn-primary" data-dismiss="modal" onClick={createAsset}></input>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
});


export default CreateAssetModal;
