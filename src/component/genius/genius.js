import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserCard from '../../component/usercard/usercard'
import {getUserList} from '../../redux/chatuser.redux';

@connect(
    state => state.chatuser,
    {getUserList}
)
export default class Genius extends Component {

    render() {
        return <UserCard userlist={this.props.userlist}/>
    }

    componentDidMount() {
        this.props.getUserList('boss')
    }
}