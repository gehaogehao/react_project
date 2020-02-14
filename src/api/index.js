import myAxios from './myAxios'
//登录
export const reqLogin = (username,password) => myAxios.post('/login',{username,password})