import {GET_CATEGORY_LIST} from '../action_type'
import {reqCategory} from '../../api'
import {message} from 'antd'
const createGetCategoryAction = (category)=> ({type:GET_CATEGORY_LIST,data:category})

export const createGetCategoryAsyncAction = ()=>{
    return async(dispatch)=>{
        let result = await reqCategory()
        const {status,data,msg} = result
        if(status === 0) dispatch(createGetCategoryAction(data))
        else{
            message.error(msg)
        }
    }
}
