import React, {Component} from 'react';
import {List, InputItem, NavBar} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'


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
        this.props.getMsgList()
        this.props.recvMsg()

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
        const user = this.props.match.params.user
        const Item = List.Item
        return (
            <div id="chat-page">
                <NavBar mode="dark">
                    {this.props.match.params.user}
                </NavBar>
                {this.props.chat.chatmsg.map(v => {
                    return v.from === user ? (
                        <List key={v._id}>
                            <Item
                                thumb={''}
                            >{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item
                                extra={'avatar'}
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