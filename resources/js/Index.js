import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import store from './store/store';
import Sidebar from './components/Sidebar';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import { Provider } from 'react-redux';
import Routes from './routes';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

class Index extends Component {
  render() {
    return (
      
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>

        <div id="wrapper">
          <BrowserRouter>
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <div className="container-fluid">
                  <Routes/>
                </div>
              </div>
            </div>    
          </BrowserRouter>
        </div>
                  
        </AlertProvider>
      </Provider>

    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('page-top'));