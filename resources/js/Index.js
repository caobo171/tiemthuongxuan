import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import store from './store/store';
import Sidebar from './components/Sidebar';
import Main from './page/Main';
import CreateProduct from './page/Product/Create';

import { Provider } from 'react-redux';


class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="wrapper">
          <BrowserRouter>
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <div className="container-fluid">
                  <Switch>
                    <Route path="/product/create" component={CreateProduct} />
                    <Route path="/" component={Main} />
                    
                  </Switch>
                </div>
              </div>
            </div>    
              {/* <Route path="/order/create" component={}/> */}
          </BrowserRouter>
        </div>
      </Provider>

    );
  }
}
ReactDOM.render(<Index/>, document.getElementById('page-top'));