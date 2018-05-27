import axios from 'axios'

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USER_DATA = 'USER_DATA';


const initData = {
    isAuth: false,
    user: '李云龙',
    age: 20
}

export function auth(state = initData, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true};
        case LOGOUT:
            return {...state, isAuth: false};
        case USER_DATA:
            return {...state, ...action.payload};
        default:
            return state
    }
}

export function getUser() {
    return dispatch=> {
        /* axios.get('./src/data.json')
         .then(res=>{
         if(res.status ===200){
         dispatch(userData(res.data))
         }
         })*/
        setTimeout(()=> {
            dispatch(userData({user: "zhangSan", age: "40"}))
        }, 2000)

    }
}

export function userData(data) {
    return {type: USER_DATA, payload: data}
}

export function login() {
    return {type: LOGIN}
}

export function logout() {
    return {type: LOGOUT}
}