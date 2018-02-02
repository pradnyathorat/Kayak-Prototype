import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    loggedIn: false,
    data:{}
}

export default function(state=initialState,action){
    switch(action.type){
        
        case "LOGIN_SUCCESS_ADMIN":
        {
            return{
                ...state,
                loggedIn: true,
                data: action.data
            };
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.adminUserData
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}