import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal,Form,Input} from 'antd'
import {connect} from 'react-redux'
import {createGetCategoryAsyncAction} from '../../redux/action/category'
import {PAGE_SIZE} from '../../config'

const {Item} = Form

@connect(
	(state)=>({category:state.categoryList}),
	{getCategory:createGetCategoryAsyncAction}
)
@Form.create()
class Category extends Component {

	state = { visible: false };
    //展示弹窗
	showModal = () => {
	  this.setState({visible: true});
	};
	//确定按钮回调
	handleOk = () => {
		this.props.form.validateFields(async(err, values) => {
			if(!err){
				console.log(values)
			}
		});
	  this.setState({visible: false});
	};
    //取消按钮回调
	handleCancel = () => {
	  this.setState({visible: false});
	};

	componentDidMount(){
		this.props.getCategory()
	}

	render() {
		const {getFieldDecorator} = this.props.form
		  //列
		  const columns = [
			{
			  title: '分类名',
			  dataIndex: 'name',
			  key: 'name',
			  width:'75%'
			},
			{
			  title: '操作',
			  dataIndex: 'age',
			  key: 'age',
			  width:'25%',
			  align:'center',
			  render:()=> <Button type='link'>修改分类</Button>
			},
		  ];
		return (
			<div>
				<Card 
					extra={
					    <Button type='primary' onClick={this.showModal}>
							<Icon type="plus-circle"/>添加
						</Button>
					}
				>
						<Table 
							dataSource={this.props.category} //数据
							columns={columns} 
							bordered
							rowKey='_id'
							pagination={{pageSize:PAGE_SIZE}}
						/>;
				</Card>
				<Modal
					title="添加分类"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText='确定'
					cancelText='取消'
				>
					 <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('categoryName', {
                                rules: [{required:true,message:'分类名必须输入'}],
                            })(
							    <Input placeholder="请输入分类名"/>
                            )}
                        </Item>
                     </Form>
				</Modal>
			</div>
		)
	}
}
export default Category