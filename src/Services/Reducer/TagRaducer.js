import { CHANGE_STATUS_TAG_BUTTON, CREATE_TAG, DELETE_SINGLE_TAG, FIND_SINGLE_TAG, GET_ALL_TAGS, UPDATED_TAG } from "../Constant";

const initialState={
    tagsData:[],
    error: ''
}

export  default (state=initialState , {type,payload , msg })=>
{

    switch (type) {
        case GET_ALL_TAGS:
            console.warn("payload again",payload)
            return{
                ...state,
                tagsData: payload
            }

        case FIND_SINGLE_TAG:
                
               return{
                ...state, 
                tagsData:payload,
               
               }   
            
        case CREATE_TAG:
            return{
                ...state,
                error:msg,
                tagsData:[payload,...state.tagsData]
            } 
            
            
        case UPDATED_TAG:
        console.warn("Update to",state.error=msg)


 
            return{
                
                error: msg,
                tagsData: state.tagsData.map((tags)=>
                tags.id==payload.id?payload: tags
                
                ),
            } 
            
        case CHANGE_STATUS_TAG_BUTTON:
            return{
                ...state,
                tagsData:state.tagsData.map((tags)=>
                tags.id==payload.id?payload: tags,
                
                ),
         
            }

        
        case DELETE_SINGLE_TAG:
            return{
                ...state,
                tagsData: state.tagsData.filter((tag)=>
                tag.id!=payload)
            }

    
        default:
            return state
    }



}


