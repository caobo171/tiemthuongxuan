import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

import BillList from './page/Bill/List';
import ImportBillList from './page/ImportBill/List';

import BillCreate from './page/Bill/Create';
import BillUpdate from './page/Bill/Update';
import ImportBillCreate from './page/ImportBill/Create'
import  BillDetail  from './page/Bill/Detail';
import ImportBillDetail from './page/ImportBill/Detail';
import ImportBillUpdate from './page/ImportBill/Update';
import CustomerList from './page/Customer/List';
import CustomerDetail from './page/Customer/Detail';

import ProviderList from './page/Provider/List';
import ProviderDetail from './page/Provider/Detail';
import Dashboard from './page/Dashboard/Main';
import ProductReports from './page/Dashboard/Product';

import AssetList from './page/Asset/List';
import ProductList from './page/Product/List';
import ProductDetail  from './page/Product/Detail';


const Routes = React.memo(()=>{
    return (
      <Switch>
        <Route path="/bills" component={BillList} />
        <Route path="/bill/create" component={BillCreate} />
        <Route path="/bill/detail/:id" component={BillDetail} />
        <Route path="/bill/update/:id" component={BillUpdate} />
        <Route path="/importbills" component={ImportBillList} />
        <Route path="/importbill/create" component={ImportBillCreate} />
        <Route path="/importbill/detail/:id" component={ImportBillDetail} />
        <Route path="/importbill/update/:id" component={ImportBillUpdate} />
        <Route path="/customers/" component={CustomerList} />
        <Route path="/customer/detail/:id" component={CustomerDetail} />
        <Route path="/providers" component={ProviderList} />
        <Route path="/provider/detail/:id" component={ProviderDetail} />

        <Route path="/assets" component={AssetList} />
        <Route path="/report/products" component={ProductReports} />
        <Route path="/products" component={ProductList} />
        <Route path="/product/detail/:id" component={ProductDetail} />
        {/*<Route path="/asset/detail/:id" component={ProviderDetail} />*/}
        <Route path="/" component={Dashboard} />
      </Switch>

    )
});


export default Routes;
