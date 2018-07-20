// react-redux
import React, {Component} from 'react';
import PropTypes from 'props-type';
import {bindActionCreators} from './my-redux';
//connect 负责链接组件，给到redux里的数据放到组件的属性里
// 1. 负责接收一个组件，把state 里的一些数据放进去，返回一个组件
// 2. 数据变化的时候，能够通知组件
const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapperComponent) => {
    return class ConnectComponent extends React.Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor(props, context) {
            super(props)
            this.state = {
                props: {}
            }
        }

        componentDidMount() {
            const {store} = this.context
            store.subscribe(() => this.update())
            this.update()
        }

        update() {
            // 获取mapStateToProps mapDispatchToProps 放到组件里
            const {store} = this.context
            const stateProps = mapStateToProps(store.getState())
            // 方法不能直接给，因为要diapatch
            // function addGun(){
            // 	return { type:ADD_GUN}
            // }
            // 直接执行addGun毫无意义
            // 要ADDgUN = ()=>store.dispatch(addGun()) 才有意义,其实就是用dispatch把actionCreator包了一层
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
            // stateProps 就是 {num:10}
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps

                }
            })
            // this.state.props = { num: 10 }
        }

        render() {
            return <WrapperComponent {...this.state.props}/>
        }
    }
}

//Provider,把store放到context里，所有的子元素可以直接取到store
export class Provider extends Component {
    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return {store: this.store}
    }

    constructor(props, context) {
        super(props, context)
        this.store = props.store
    }

    render() {
        return this.props.children
    }
}

