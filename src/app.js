import React from 'react'
import {Route, Switch} from 'react-router-dom'

import GeniusInfo from "./container/geniusinfo/geniusinfo";
import Register from "./container/register/register";
import BossInfo from "./container/bossinfo/bossinfo";
import Chat from "./component/chat/chat";
import Login from "./container/login/login";
import Dashboard from "./component/dashboard/dashboard";

import AuthRoute from "./component/authroute/authroute";


class App extends React.Component {
    render() {
        return (
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
        )
    }
}

export default App