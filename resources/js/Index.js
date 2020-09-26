import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Main from './Router';
import store from './store/store';
import { Provider } from 'react-redux';
import Example from './components/Example';
class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Example/>
        </BrowserRouter>
      </Provider>

    );
  }
}
ReactDOM.render(<Index/>, document.getElementById('index'));