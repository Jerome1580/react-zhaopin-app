
const ADD_GUN = 'ADD_GUN';
const REMOVE_GUN = 'REMOVE_GUN';


// 1 定义reducer
export function counter(state = 0, action) {
    switch (action.type) {
        case ADD_GUN:
            return state + 1
        case REMOVE_GUN:
            return state - 1
        default:
            return 10
    }
}


// action creator
export function add_Gun(){
    return {type:ADD_GUN}
}

export function remove_Gun(){
    return {type:REMOVE_GUN}
}

export function add_GunAsync(){
    return dispatch=>{
        setTimeout(function() {
            dispatch(add_Gun())
        }, 2000);
    }
}
