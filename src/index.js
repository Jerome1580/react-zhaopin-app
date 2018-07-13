import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware , compose} from 'redux';
import { createLogger } from 'redux-logger' // 利用redux-logger打印日志
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducer'

import './config'
import './index.css'

import Login from './container/login/login'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import Dashboard from "./component/dashboard/dashboard";
import Chat from "./component/chat/chat";

// 调用日志打印方法 collapsed是让action折叠，看着舒服点
const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true
});
// 创建一个中间件集合
const middleware = [thunk, loggerMiddleware];

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const store = createStore(reducers, compose(
    applyMiddleware(...middleware),
    reduxDevtools
));

// boss genius me msg 4个页面
ReactDOM.render(
( <Provider store={store}>
    <BrowserRouter>
        <div>
            <AuthRoute/>
            <Switch>
                <Route path="/geniusinfo" component={GeniusInfo}/>
                <Route path="/bossinfo" component={BossInfo}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/chat/:user" component={Chat}/>
                <Route component={Dashboard}/>
            </Switch>
        </div>

    </BrowserRouter>
</Provider> )
, document.getElementById('root'));


registerServiceWorker();
