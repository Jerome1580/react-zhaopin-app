import React from 'react'
import Logo from '../../component/logo/logo'
import imoocForm from '../../component/imooc-form/imooc-form'
import {List ,InputItem , WingBlank ,WhiteSpace ,Button } from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'

@connect(
    state => state.user,
    {login}
)
@imoocForm
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this)
    }


    handleLogin() {
        this.props.login(this.props.state)
    }

    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ?
                    <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <h2>登录页</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}
                        >用户</InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login