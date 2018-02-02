import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    pending: false,
    logged: false
}

export default function(state=initialState,action){
    switch(action.type){
        
        case "CHANGE_USER_STATE":
        return {
            pending: action.pending,
            logged: action.logged
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.userState
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}