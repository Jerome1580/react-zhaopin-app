import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware , compose} from 'redux';
import { createLogger } from 'redux-logger' // 利用redux-logger打印日志
import thunk from 'redux-thunk';

import { BrowserRouter , Route  , Redirect , Switch} from 'react-router-dom'
//引入redux-devtools-extension的可视化工具（有点吊）
//import { composeWithDevTools } from 'redux-devtools-extension';//devToolsEnhancer,
import { Provider } from 'react-redux'
import reducers from './reducer'
import Auth from './Auth.js'
import Dashboard from './Dashboard.js'

import './index.css';
import registerServiceWorker from './registerServiceWorker';

// 调用日志打印方法 collapsed是让action折叠，看着舒服点
const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true
});
// 创建一个中间件集合
const middleware = [thunk, loggerMiddleware];

//const reduxDevtools = window.devToolsExtension?window.devToolsExtension():()=>{};
const store = createStore(reducers, compose(
    applyMiddleware(...middleware)
));
ReactDOM.render(
( <Provider store={store}>
    <BrowserRouter>
        <Switch>
            {/* 只渲染命中的第一个组件*/}
            <Route path="/login" exact component={Auth}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Redirect to="/dashboard"/>
        </Switch>

    </BrowserRouter>
</Provider> )
, document.getElementById('root'));


registerServiceWorker();
