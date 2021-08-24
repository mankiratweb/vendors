import { 
    GET_ALL_SUBCATS ,
    CHANGE_STATUS_SUBCATS_BUTTON,
    CREATE_SUBCATS,
    UPDATED_SUBCATS,
    FIND_SINGLE_SUBCATS,
    DELETE_SINGLE_SUBCATS



} from "../Constant";

import axios from "axios";




export const getSingleSubCat = (id)=> async(dispatch)=>{

const result = await axios.get("http://127.0.0.1:8000/api/findsubcat/"+id);
dispatch({
    type: FIND_SINGLE_SUBCATS,
    payload: result.data.result,
    msg:result.data.msg

});

}












export const getAllSubCats=()=> async (dispatch)=>{


    const result =  await axios.get("http://127.0.0.1:8000/api/allsubcat");
    dispatch({
        type: GET_ALL_SUBCATS,
        payload: result.data.result,
        msg:result.data.msg

    });
    
 

}

export const changeStatusAc=(id,userId,role)=>async (dispatch)=>{
    const result = await axios.post("http://127.0.0.1:8000/api/changesubcatstatus/"+id+"/"+userId+"/"+role+"?_method=PUT");
   dispatch({
       type:CHANGE_STATUS_SUBCATS_BUTTON,
       payload:result.data.result,
       msg:result.data.msg
   }) 
}



export const createSubCatAc = (data)=> async(dispatch)=>{

    const result =await axios.post("http://127.0.0.1:8000/api/addsubcat",data);
   
        dispatch({
            type:CREATE_SUBCATS,
     payload:result.data.result,
            msg: result.data.msg
    
        })

    
       
 
}
export const deleteSubcatAc = (id,userId,userRole)=>async(dispatch)=>{
    const result =await axios.delete("http://127.0.0.1:8000/api/deletesubcat/"+id+"/"+userId+"/"+userRole);
    dispatch({
        type:DELETE_SINGLE_SUBCATS,
        payload:id,
        msg: result.data.msg,
         
    })
}




export const updateSubCatAc = (id,userId,userRole,formData)=>async(dispatch)=>{
    const result = await axios.post("http://127.0.0.1:8000/api/updatesubcat/"+id+"/"+userId+"/"+userRole+"?_method=PUT",formData);
    dispatch({
        type:UPDATED_SUBCATS,
        payload:result.data.result,
        msg:result.data.msg
    });
}