import {SAVE_USERINFO,DELETE_USERINFO} from '../action_type'
let _user = JSON.parse(localStorage.getItem('user'))
let _token = localStorage.getItem('token')
let initState = {
    user:_user || {},
    token:_token || '',
    isLogin: (_user && _token) ? true : false
}
export default function(perState=initState,action){
    const {type,data} = action
    let newState
    switch (type) {
        case SAVE_USERINFO:
            const {user,token} = data
            newState = {user,token,isLogin:true}
           return newState
        case DELETE_USERINFO:
            newState = {user:{},token:'',isLogin:false} 
           return newState
        default:
            return perState
    }
}