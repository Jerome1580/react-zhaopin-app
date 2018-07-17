import React, {Component} from 'react';
import {List, InputItem, NavBar, Icon} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
import {getChatId} from "../../util";


@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg}
)
export default class Chat extends Component {

    componentDidMount() {
        /*socket.on('recvmsg', data => {
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })*/
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    state = {text: '', msg: []}

    handleSubmit = () => {
        // socket.emit('sendmsg', {text: this.state.text})

        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text: ''});
    }

    render() {
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
        return (
            <div id="chat-page">
                <NavBar mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.goBack()
                        }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar}/>}
                                className="chat-me"
                            >{v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                        />
                    </List>
                </div>
            </div>
        )
    }
}