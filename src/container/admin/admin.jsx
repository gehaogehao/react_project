import React, { Component } from 'react'
import check from '../check/check'
import { Layout } from 'antd';
import Header from '../header/header'
import './css/admin.less'

const { Footer, Sider, Content } = Layout


@check
class Admin extends Component {
    render() {
        return (
            <Layout className='Layout'>
                <Sider>Sider</Sider>
                <Layout>
                    <Header/>
                    <Content style={{backgroundColor:'red'}}>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin

// export default  connect(
//     (state)=>({userInfo:state.userInfo}),
//     {deleteUserInfo:createDeleteUserInfoAction}
// )(Admin)