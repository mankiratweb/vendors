import {
    CHANGE_STATUS_TAG_BUTTON,
    DELETE_SINGLE_TAG,
    FIND_SINGLE_TAG,
    GET_ALL_TAGS,
    UPDATED_TAG,CREATE_TAG
} from "../Constant";
 
import axios from "axios";



// start All Tags  Action
export const getAllTagAc = () => async (dispatch) => {
 
    const result = await axios.get("http://127.0.0.1:8000/api/alltags");
if( result.data!=0){
    dispatch({
        type: GET_ALL_TAGS,
        payload: result.data
    });
}else{

    dispatch({
        type: GET_ALL_TAGS,
        
    });


}


}
// End All Tags Action



//Start Single Tag Find 

export const findSingleTag = (id, userId) => async (dispatch) => {
    const result = await axios.get("http://127.0.0.1:8000/api/findtag/" + id + "/" + userId);
    dispatch({
        type: FIND_SINGLE_TAG,
        payload: result.data
    })
}




//End Single Tag Find




// Start Create Tag

export const createTagAc = (data) => async (dispatch) => {
    const result = await axios.post("http://127.0.0.1:8000/api/addtag", data);

    dispatch({
        type: CREATE_TAG,
        payload:result.data.result,
        msg: result.data.msg
    })
 
 
  

}
// End create tag


//Delete Tag

export const deleteSingleTag = (id,userId)=>async (dispatch)=>{
    const result = await axios.delete("http://127.0.0.1:8000/api/deletetag/"+id+"/"+userId);


dispatch({
    type:DELETE_SINGLE_TAG,
    payload :result.data,
     
})


}


// End Delet6e Tag 





// Start update Tag 


export const updatedTag = (formData, id, userId) => async (dispatch) => {
    const result = await axios.post("http://127.0.0.1:8000/api/updatetag/" + id + "/" + userId + "?_method=PUT", formData);
 

    if(result.data==1){
    dispatch({
        type: UPDATED_TAG,
        payload: result.data,
        msg:result.data
    })}

    else if(result.data==0){
        dispatch({
            type: UPDATED_TAG,  
            msg: "Not_Updated",
            payload: result.data

        })}
    else{
                dispatch({
                    type: UPDATED_TAG,
                    payload: result.data,
                    msg: 'error'
        
                })}
            }
        
        
    
// End Updated Tag


// Start Status change

export const statusChangeTagButon=(id,userId)=> async (dispatch)=>{;

    const result = await axios.post("http://127.0.0.1:8000/api/change_status/"+id+"/"+userId+"?_method=PUT");



dispatch({
    type: CHANGE_STATUS_TAG_BUTTON,
    payload:result.data,
    result: result

})


}

// End status Change 
