import React, { Component } from 'react'
import { Menu, Icon} from 'antd';
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {createSaveTitleAction} from '../../redux/action/header'
import logo from '../../static/imgs/logo.png'
import menus from '../../config/menu-config'
import './css/left-nav.less'

const {SubMenu,Item} = Menu;

@connect(
    (state)=>({title:state.headerTitle}),
    {saveTitle:createSaveTitleAction}
)
@withRouter
class LeftNav extends Component {

    getTitle = ()=>{
		let title = ''
		let {pathname} = this.props.location
		if(pathname === '/admin') pathname = '/admin/home'
		let currentKey = pathname.split('/').reverse()[0]
		menus.forEach((menuObj)=>{
			if(menuObj.children instanceof Array){
				let result = menuObj.children.find((childMenu)=>{
					return childMenu.key === currentKey
				})
				if(result) title = result.title
			}else{
				if(menuObj.key === currentKey) title = menuObj.title
			}
		})
		this.props.saveTitle(title)
	}

	componentDidMount(){
		if(!this.props.title){
			this.getTitle()
		}
	}

    //创建菜单
    createMenu=(menusArr)=>{
        return menusArr.map((menuObj)=>{
            if(!menuObj.children){
                return (
                    <Item key={menuObj.key} onClick={()=>{this.props.saveTitle(menuObj.title)}}>
                        <Link to={menuObj.path}>
                            <Icon type={menuObj.icon}/>
                            <span>{menuObj.title}</span>
                        </Link>
                    </Item>
                )
            }else{
                return (
                    <SubMenu
                        key={menuObj.key}
                        title={
                            <span>
                                <Icon type={menuObj.icon} />
                                <span>{menuObj.title}</span>
                            </span>
                        }
                    >
                        {this.createMenu(menuObj.children)}
                    </SubMenu> 
                )
            }
        })
    }

    render() {
        const {pathname} = this.props.location
        const SelectedKeys = pathname.split('/').reverse()[0]
        const OpenKeys =  pathname.split('/')
        return (
            <div className='left-nav'>
                <div className='nav-top'>
                    <img src={logo} alt="logo"/>
                    <span>商品管理系统</span>
                </div>
                <Menu
                    selectedKeys={[SelectedKeys]}
                    defaultOpenKeys={OpenKeys}
                    mode="inline"
                    theme="dark"
                >
                    {this.createMenu(menus)}  
                </Menu>
            </div>
        )
    }
}
export default LeftNav