import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios'
import './css/login.less'
import Logo from './img/logo.png'

 class Login extends Component {
     //密码校验器(自定义)
    passwordValidator=(rule, value, callback)=>{
        if(!value){
            callback('密码必须输入')
        }else if(value.length > 12){
            callback('密码必须小于12位')
        }else if(value.length < 4){
            callback('密码必须大于4位')
        }else if(!(/^\w+$/).test(value)){
            callback('用户名必须必须是英文、数字或下划线组成')
        }else{
            callback()
        }
    }
    //响应表单提交
    handleSubmit = e => {
        e.preventDefault();
        //此处获取表单用户输入values{username:'',password:''}
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const {username,password} = values
            axios.post('http://localhost:3000/login',`username=${username}&password=${password}`).then(
               (response) => {console.log(response.data)},
               (error) => {console.log(error)}
            )
          }
        });
      };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {Item}  = Form
        return (
            <div id='login'>
                <div className='header'>
                    <img src={Logo}alt="logo"/>
                    <h1>商品管理系统</h1>
                </div>
                <div className='content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {required:true,message:'用户名必须输入'},
                                    {max:12,message: '用户名必须小于12位'},
                                    {min:4,message: '用户名必须大于4位'},
                                    {pattern:/^\w+$/,message: '用户名必须必须是英文、数字或下划线组成'}
                                ],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                    rules: [
                                        //声明式
                                        // {required:true,message:'密码必须输入' },
                                        // {max:12,message: '密码必须小于12位'},
                                        // {min:4,message: '密码必须大于4位'},
                                        // {pattern:/^\w+$/,message: '密码必须必须是英文、数字或下划线组成'}
                                        {validator:this.passwordValidator}
                                    ],
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                    />,
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create()(Login);
