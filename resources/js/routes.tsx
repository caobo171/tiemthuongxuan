import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

import BillList from './page/Bill/List';
import ImportBillList from './page/ImportBill/List';

import BillCreate from './page/Bill/Create';
import ImportBillCreate from './page/ImportBill/Create'
import  BillDetail  from './page/Bill/Detail';
import ImportBillDetail from './page/ImportBill/Detail';
import CustomerList from './page/Customer/List';
import CustomerDetail from './page/Customer/Detail';

import ProviderList from './page/Provider/List';
import ProviderDetail from './page/Provider/Detail';

const Routes = React.memo(()=>{
    return (
      <Switch>
        <Route path="/bills" component={BillList} />
        <Route path="/bill/create" component={BillCreate} />
        <Route path="/bill/detail/:id" component={BillDetail} />
        <Route path="/importbills" component={ImportBillList} />
        <Route path="/importbill/create" component={ImportBillCreate} />
        <Route path="/importbill/detail/:id" component={ImportBillDetail} />
        <Route path="/customers/" component={CustomerList} />
        <Route path="/customer/detail/:id" component={CustomerDetail} />
        <Route path="/providers/" component={ProviderList} />
        <Route path="/provider/detail/:id" component={ProviderDetail} />
      </Switch>

    )
});


export default Routes;
