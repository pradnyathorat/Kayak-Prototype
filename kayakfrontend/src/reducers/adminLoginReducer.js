import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    email:'',
    password:'',
}


export default function(state=initialState,action){
    switch(action.type){
        
        case "CHANGE_VALUE_LOGIN_ADMIN":
        {
            return{
                ...state,
                [action.data.target.name]:action.data.target.value
            };
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.adminLoginData
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}