import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {initialState} from './App';
import Snake from "./Snake";
import * as serviceWorker from './serviceWorker';
import {Route, Switch, BrowserRouter, Redirect} from "react-router-dom"
import Menu from "./Menu";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Switch>
              <Route path='/home' component={Menu}/>
              <Route path='/game' component={App}/>
              <Redirect from='/' to='/home'/>

          </Switch>
      </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
