import { GET_ALL_SUBCATS, CHANGE_STATUS_SUBCATS_BUTTON, CREATE_SUBCATS, DELETE_SINGLE_SUBCATS, FIND_SINGLE_SUBCATS, UPDATED_SUBCATS } from "../Constant";

const initialState = {
    subCatData: [],
    subError: ''
}


export default (state = initialState, { type, payload, msg }) => {



    switch (type) {
        case GET_ALL_SUBCATS:
            if(msg=='show_all_sub'){
            return {
                ...state,
                subError: msg,
                subCatData: payload
            }
        }else{ return { subError: msg } }






        case FIND_SINGLE_SUBCATS:
            if(msg=='get_single'){
               
                return {
                    ...state,
                    subError: msg,
                    subCatData: payload
                }

            }
            else{ return { subError: msg  }   }





        case CHANGE_STATUS_SUBCATS_BUTTON:
            if(msg=='status_changed'){
                return {
                    ...state,
                    subError: msg,
                    subCatData: state.subCatData.map((subCat) =>
                        subCat.id == payload.id ? state.subCatData:payload )
                }

            }
            else{
                return { subError: msg    }
            }
          
            case CREATE_SUBCATS:
            if (msg == "inserted") {
                return {
                    ...state,
                    subError: msg,
                    subCatData: payload
                }
            }
            else {
                return {

                    subError: msg
                }
            }

        case DELETE_SINGLE_SUBCATS:
            if (msg == "deleted") {
                return {
                    ...state,
                    subError: msg,
                    subCatData: state.subCatData.filter((subCat) =>
                        subCat.id !== payload)
                }

            }
            else {
                return {
                    subError: msg
                }
            }
        
        case UPDATED_SUBCATS:
            if(msg=="updated"){
                return{
                    ...state,
                    subError: msg,
                    subCatData: state.subCatData.filter((subCat)=>
                    subCat.id==payload.id?state.subCatData:payload
                    )
                }
            }  
            else{
                return { subError:msg }
            }        


        default:
            return state
    }
}
