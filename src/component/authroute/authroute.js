import React from 'react'
import axios from 'axios'

class AuthRoute extends React.Component {
    componentDidMount() {
        axios.get('/user/info')
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Logo