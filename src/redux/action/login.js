import {SAVE_USERINFO,DELETE_USERINFO} from '../action_type'
export const createSaveUserInfoAction = (personObj)=>{
    localStorage.setItem('user',JSON.stringify(personObj.user))
    localStorage.setItem('token',personObj.token)
    return {type:SAVE_USERINFO,data:personObj}
}
export const createDeleteUserInfoAction = ()=>{
    localStorage.clear()
    return {type:DELETE_USERINFO,data:{}}
}