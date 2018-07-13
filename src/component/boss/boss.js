import React, {Component} from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';

@connect(
    state => state.chatuser,
    {getUserList}
)
export default class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return (
            <WingBlank>
                <WhiteSpace/>
                {
                    this.props.userlist.map(v => (
                        v.avatar ? <Card key={v.user}>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                {v.desc.split('\n').map(d => (
                                    <div key={d}>{d}</div>
                                ))}
                            </Card.Body>
                        </Card> : null
                    ))
                }
            </WingBlank>
        )
    }

    componentDidMount() {
        this.props.getUserList('genius')
    }
}