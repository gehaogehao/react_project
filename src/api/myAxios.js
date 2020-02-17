import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
import NProgress from 'nprogress'
import {BASE_URL} from '../config'
import store from '../redux/store'
import {createDeleteTitleAction} from '../redux/action/header'
import {createDeleteUserInfoAction} from '../redux/action/login'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = BASE_URL
//请求
axios.interceptors.request.use((config)=>{
  if(store.getState().userInfo.token){
    const {token} = store.getState().userInfo
    config.headers.Authorization = 'atguigu_'+token
  }
    NProgress.start()
    const {method,data} = config
    if(method.toUpperCase()==='POST' && data instanceof Object){
        config.data = qs.stringify(data)
    }
    return config
})

//响应
axios.interceptors.response.use(
  response => {
      NProgress.done()
      return response.data
    },
  error => {
      NProgress.done()
      if(error.response.status === 401){
        message.error('身份过期,请重新登录!')
        store.dispatch(createDeleteTitleAction())
        store.dispatch(createDeleteUserInfoAction())
      }else{
        message.error('请求失败,请联系管理员!')
      }
      return new Promise(()=>{})
  }
)
export default axios