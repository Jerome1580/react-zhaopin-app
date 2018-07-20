// 迷你 redux
export function creatStore(reducer) {
    let currentState = {}
    let currentListeners = []

    function getState() {
        return currentState
    }

    function subscribe(listener) {
        currentListeners.push(listener)
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        currentListeners.forEach(v => v())
        return action
    }

    dispatch({type: '@my-redux/redux'}) // 手动触发redux初始化

    return {getState, subscribe, dispatch}
}

// {addGun ,removeGun ,addGunAsync}
// addGun()
// dispatch(addGun)
function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}

// {addGun ,removeGun ,addGunAsync}
export function bindActionCreators(creators, dispatch) {
    // let bound = {}
    // Object.keys(creators).forEach(v=>{
    // 	let creator = creators[v]
    // 	bound[v] = bindActionCreator(creator,dispatch)
    // })
    // return bound
    return Object.keys(creators).reduce((ret, item) => {
        ret[item] = bindActionCreator(creators[item], dispatch)
    }, {})
}