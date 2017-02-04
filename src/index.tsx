import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './Layout';
import aboutPage from './pages/AboutPage';
import loginPage from './pages/LoginPage';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import Router from 'react-router/lib/Router';
import Link from 'react-router/lib/Link';
import browserHistory from 'react-router/lib/browserHistory';
import { createStore, combineReducers } from 'redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

let store = createStore(combineReducers({about: aboutPage.reducer, login: loginPage.reducer}));



function render() {
  return ReactDOM.render(
    <Layout />,
    document.getElementById('root') as HTMLElement
  );
}

store.subscribe(render);
render();