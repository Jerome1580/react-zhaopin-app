import React, {Component} from 'react';
import PropTypes from 'props-type';

// context
// context是全局的，组件里声明，所有子元素可以直接获取
class Slidebar extends Component {
    render() {
        return (
            <div>
                <p>侧边栏</p>
                <Navbar/>
            </div>
        );
    }
}


/*function Navbar(props,context){
    // 无状态组件
}*/
class Navbar extends Component {
    static contextTypes = {
        user: PropTypes.string
    }

    render() {
        return (
            // context 对传入数据是强校验，必须校验
            <p>{this.context.user}导航</p>
        );
    }
}


class App extends Component {
    static childContextTypes = {
        user: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {user: 'woniu'}
    }

    getChildContext() {
        renturn
        this.state
    }

    render() {
        return (
            <div>
                {this.state.user}
            </div>
        );
    }
}


export default App;
