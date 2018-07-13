import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from "prop-types";

import {Card, WingBlank, WhiteSpace} from 'antd-mobile';

@withRouter
export default class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        return (
            <WingBlank>
                <WhiteSpace/>
                {
                    this.props.userlist.map(v => (
                        v.avatar ? (
                            <Card
                                key={v.user}
                                onClick={() => this.handleClick(v)}
                            >
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                />
                                <Card.Body>
                                    {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                                    {v.desc.split('\n').map(d => (
                                        <div key={d}>{d}</div>
                                    ))}
                                    {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                                </Card.Body>
                            </Card>) : null
                    ))
                }
            </WingBlank>
        )
    }
}