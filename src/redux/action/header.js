import {SAVE_TITLE,DELETE_TITLE} from '../action_type'
export const createSaveTitleAction = (title)=> ({type:SAVE_TITLE,data:title})
export const createDeleteTitleAction = ()=>({type:DELETE_TITLE,data:''})
