import * as React from 'react';
import * as ReactDOM from 'react-dom';

let Route = require('react-router/lib/Route');
let IndexRoute = require('react-router/lib/IndexRoute');
let Router = require('react-router/lib/Router');
let Link = require('react-router/lib/Link');
let browserHistory = require('react-router/lib/browserHistory');
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Layout from './Layout';
import aboutPage from './pages/AboutPage';
import loginPage from './pages/LoginPage';

const epicMiddleware = createEpicMiddleware(aboutPage.epic);
let store = createStore(
              combineReducers({about: aboutPage.reducer, login: loginPage.reducer}),
              applyMiddleware(epicMiddleware)
            );

let routes =  (
  <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
      {[aboutPage, loginPage].map(page => 
        <Route key={page.route} path={page.route} component={page.pageFactory(store)} />
      )}    
  </Route>
);

function render() {
  return ReactDOM.render(
    <Router history={browserHistory} >
      {routes}
    </Router>,
    document.getElementById('root') as HTMLElement
  );
}

store.subscribe(render);
render();

function Home() {
  return (
    <div><h1>Home</h1>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>);
}