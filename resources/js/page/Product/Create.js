import React from 'react';
import Item from './Item';


const CreateProduct = React.memo(() => {
    return (<>
            <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                <h1 className="h3 mb-0 text-gray-800">Create New Order</h1>
            </div>
            <div className="row">
                <div className="col-xl-8 col-md-6 mb-8">
                        <div className="col mb-4">
                        <div className="card shadow">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Thông tin khách hàng</h6>
                            </div>
                            <div className="card-body">
                                <div className="col">
                                    <div className="row">
                                        <div className="input-group">
                                                <input className="form-control dropdown-toggle" href="#" id="navbarDropdown" 
                                                placeholder="Search for..."
                                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                </input>
                                                <div className="dropdown-menu dropdown-menu-right animated--grow-in" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        </div>


                        <div className="col">
                        <div className="card shadow">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Thông tin sản phẩm</h6>
                            </div>
                            <div className="card-body">
                                <div className="col">
                                    <div className="row">
                                        <div className="h6 font-weight-bold text-gray-800">
                                            Thông tin sản phẩm
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="input-group">
                                                <input className="form-control dropdown-toggle" href="#" id="navbarDropdown" 
                                                placeholder="Search for..."
                                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                </input>
                                                <div className="dropdown-menu dropdown-menu-right animated--grow-in" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item" data-toggle="modal" data-target="#createProductModal">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="row card-header mb-2">
                                            <div className="col">Mã SKU</div>
                                            <div className="col">Tên sản phẩm</div>
                                            <div className="col">
                                               Đơn vị
                                            </div>
                                            <div className="col">Số lượng </div>
                                            <div className="col">Đơn giá</div>
                                            <div className="col">75000</div>
                                        </div>
                                        <Item/>
                                        <Item/>
                                    </div>

                                </div>
                            
                            </div>
                        </div>
                        </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card shadow py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Earnings (Monthly)</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="createProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
                </div>
            </div>
        </>);
});




export default CreateProduct;