import React from 'react'
import Logo from '../../component/logo/logo'
import imoocForm from '../../component/imooc-form/imooc-form'
import {List ,InputItem ,Radio, WingBlank ,WhiteSpace ,Button } from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { register } from '../../redux/user.redux'

@connect(
    state => state.user,
    {register}
)
@imoocForm
class Register extends React.Component {

    handleRegister() {
        this.props.register(this.props.state)
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }
    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <h2>注册页</h2>
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
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('repeatpwd', v)}
                        >确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.props.state.type === 'genius'}
                            onChange={() => this.props.handleChange('type', 'genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.props.state.type === 'boss'}
                            onChange={() => this.props.handleChange('type', 'boss')}
                        >
                            boss
                        </RadioItem>
                        <Button type="primary" onClick={this.handleRegister.bind(this)}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )

    }
}
export default Register