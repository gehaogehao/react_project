import React, { Component } from 'react'
import {Icon,Button,Modal} from 'antd'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import {createDeleteUserInfoAction} from '../../redux/action/login'
import {reqWeather} from '../../api'
import './css/header.less'
const { confirm } = Modal;

@connect(
    state=>({userInfo:state.userInfo.user.username}),
    {deleteUserInfo:createDeleteUserInfoAction}
)
class Header extends Component {

    state={
        isScreenFull:false,
        time:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'),
        weatherData:{temp:'',pic:''}
    }
    //全屏切换
    fullscreen = ()=>{
        screenfull.toggle();
    }
    //退出登录
    delete = ()=>{
        confirm({
            title: '确定退出登录吗?',
            content: '退出登录后,将需要重新登录',
            okText:'确定',
            cancelText:'取消',
            onOk:()=>{
                this.props.deleteUserInfo()
            },
        });
    }

    //天气
    getWeather = async()=>{
        let result = await reqWeather()
        const {temperature,dayPictureUrl} = result
        this.setState({weatherData:{temp:temperature,pic:dayPictureUrl}})
    }

    componentDidMount(){
        //全屏
        screenfull.on('change', () => {
            let isScreenFull = !this.state.isScreenFull
            this.setState({isScreenFull})
        });
        //时间
        this.timeid=setInterval(()=>{
            this.setState({time:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss')})
        },1000)
        //天气
        this.getWeather()
    }

    componentWillUnmount(){
        clearInterval(this.timeid)
    }

    render() {
        const {isScreenFull} = this.state
        return (
            <div className='header'>
               <div className='header-top'>
                   <Button size='small' className='btn' onClick={this.fullscreen}>
                    <Icon type={isScreenFull?'fullscreen-exit':'fullscreen'} /> 
                   </Button>
                   <span>欢迎登录, {this.props.userInfo}</span>
                   <Button type='link' onClick={this.delete}>退出登录</Button>
               </div> 
               <div className='header-bottom'>
                   <div className='bottom-left'>
                       首页
                   </div>
                   <div className='bottom-right'>
                       <span>{this.state.time}</span>
                       <img src={this.state.weatherData.pic} alt="天气图标"/>
                       <span className='weather'>温度:{this.state.weatherData.temp}</span>
                   </div>
               </div>
            </div>
        )
    }
}
export default Header