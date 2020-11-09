import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import store from './store/store';
import Sidebar from './components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Provider } from 'react-redux';
import Routes from './routes';


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
                  <Routes/>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </div>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>

    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('page-top'));
