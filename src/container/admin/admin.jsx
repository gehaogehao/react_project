import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createDeleteUserInfoAction} from '../../redux/action/login'

class Admin extends Component {
    
    delete=()=>{
        this.props.deleteUserInfo()
    }

    render() {
        const {isLogin} = this.props.userInfo
        if(!isLogin)  return <Redirect to='/login'/>
        return (
            <div>
                欢迎登陆: {this.props.userInfo.user.username}
                <button onClick={this.delete}>退出登录</button>
            </div>
        )
    }
}

export default  connect(
    (state)=>({userInfo:state.userInfo}),
    {deleteUserInfo:createDeleteUserInfoAction}
)(Admin)