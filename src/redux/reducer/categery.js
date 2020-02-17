import {GET_CATEGORY_LIST} from '../action_type'

export default function(perState=[],action){
    const {type,data} = action
    let newState
    switch (type) {
        case GET_CATEGORY_LIST:
            newState = [...data]
           return newState
        default:
            return perState
    }
}