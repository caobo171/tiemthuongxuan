import React, { useRef, useCallback } from 'react';
import { useAsyncFn } from 'react-use';
import Fetch from '../../service/Fetch';
import { PLATFORMS } from '../../Constants';

const CreateAssetModal = React.memo(()=>{

    const nameRef = useRef<HTMLInputElement>(null);
    const cycleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const costRef = useRef<HTMLInputElement>(null);

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
        const res = await Fetch.post('api/asset',{
            name, cycle, cost, description
        });

        return res.data
    },[]);

    return(
        <>
        <div className="modal fade" id="createAssetModal" tabIndex={-1} role="dialog"
        aria-labelledby="create-user-modal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="create-user-modal">Thêm khách hàng</h5>
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
                                <label>Cycle </label>
                                <input className="form-control"
                                type="number"
                                ref={cycleRef}></input>
                            </div>

                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label>Cost </label>
                                <input className="form-control" ref={costRef}></input>
                            </div>
                            <div className="form-group col">
                                <label>Description </label>
                                <input className="form-control" ref={descriptionRef}></input>
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
