import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';

@connect(
    state => state.user,
    {update}
)
class BossInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            desc: '',
            company: '',
            money: ''
        }
    }


    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }


    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">Boss完善信息页面</NavBar>
                <AvatarSelector selectAvatar={(imgname) => {
                    this.setState({
                        avatar: imgname
                    })
                }}/>
                <InputItem onChange={v => this.handleChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={v => this.handleChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={v => this.handleChange('money', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    onChange={v => this.handleChange('desc', v)}
                    row={3}
                    autoHeight
                    title="职位要求"
                >
                </TextareaItem>
                <Button
                    type='primary'
                    onClick={() => this.props.update(this.state)}
                >保存</Button>
            </div>
        )
    }
}

export default BossInfo