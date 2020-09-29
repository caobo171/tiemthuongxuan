import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

import BillList from './page/Bill/List';
import ImportBillList from './page/ImportBill/List';

import BillCreate from './page/Bill/Create';
import ImportBillCreate from './page/ImportBill/Create'

const Routes = React.memo(()=>{
    return (
      <Switch>
        <Route path="/bills" component={BillList} />
        <Route path="/bill/create" component={BillCreate} />
        <Route path="/importbills" component={ImportBillList} />
        <Route path="/importbill/create" component={ImportBillCreate} />
      </Switch>

    )
});


export default Routes;