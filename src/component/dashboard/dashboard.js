import React from 'react';
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'

const Boss = () => (<h3>boss列表</h3>)
const Genius = () => (<h3>牛人列表</h3>)
const Msg = () => (<h3>Msg</h3>)
const User = () => (<h3>User</h3>)

@connect(
    state => state
)
class Dashboard extends React.Component {

    render() {
        const {pathname} = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type == 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type == 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        return (
            <div>
                <NavBar mode="dark">{navList.find(v => v.path === pathname).title}</NavBar>
                <NavLinkBar data={navList}/>
            </div>
        )
    }

}

export default Dashboard