import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = React.memo(() => {

  React.useEffect(()=>{
      //@ts-ignore
    window.$(".accordion .nav-item .nav-link").click(function(){
      //@ts-ignore
      var isShow = window.$(this).parent().find('.collapse').css('display');
   
      if (isShow == 'block') {
        //@ts-ignore
        window.$(this).parent().find('.collapse').slideUp();
      } else {
        //@ts-ignore
        window.$(this).parent().find('.collapse').slideDown();
      }

    })
  },[]);

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar">
      <Link className="sidebar-brand d-flex
      align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Tiệm Thường Xuân </div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
        <a className="nav-link">
           <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Báo cáo</span>
        </a>
        <div className="collapse">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="/" >Dashboard</Link>
            <Link className="collapse-item" to="/report/products">Mặt hàng</Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" >
          <i className="fas fa-fw fa-cog"></i>
          <span>Đơn Hàng</span>
        </a>
        <div  className="collapse">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="/bill/create" >Tạo đơn</Link>
            <Link className="collapse-item" to="/bills">Danh sách Đơn </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
      <a className="nav-link" >
          <i className="fas fa-fw fa-cog"></i>
          <span>Khách hàng</span>
        </a>
        <div id="collapseThree" className="collapse" >
          <div className="bg-white py-2 collapse-inner rounded">
          <Link className="collapse-item" to="/customers">Danh sách</Link>
        </div>
        </div>
      </li>

      <li className="nav-item">
        <a className="nav-link">
          <i className="fas fa-fw fa-cog"></i>
          <span>Sản phẩm</span>
        </a>
        <div  className="collapse">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="/products">Danh sách sản phẩm</Link>
            <Link className="collapse-item" to="/importbill/create">Nhập hàng</Link>
            <Link className="collapse-item" to="/importbills">Đơn nhập hàng</Link>
            <Link className="collapse-item" to="/providers">Nhà cung cấp</Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a className="nav-link " href="#">
          <i className="fas fa-fw fa-cog"></i>
          <span>Tài sản</span>
        </a>
        <div  className="collapse">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="/assets">Danh sách</Link>
          </div>
        </div>
      </li>
      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>);
});

export default Sidebar;
