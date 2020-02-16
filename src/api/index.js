import myAxios from './myAxios'
import jsonp from 'jsonp'
import {message} from 'antd'
import {WEATHER_URL,AK_URL} from '../config'
//登录请求
export const reqLogin = (username,password) => myAxios.post('/login',{username,password})
//天气预报请求
export const reqWeather = ()=>{
    const url =`${WEATHER_URL}?location=北京&output=json&ak=${AK_URL}`
    return new Promise((resolve,reject)=>{
        jsonp(url,(err,data)=>{
            if(!err){
                const {temperature} = data.results[0].weather_data[0]
                const {dayPictureUrl} = data.results[0].weather_data[0]
                const weatherObj = {temperature,dayPictureUrl}
                resolve(weatherObj)
            }else{
                message.error('请求天气失败,请联系管理员!')
            }
        })
    })
}