import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    isOpen:false,
};

export default function(state=initialState,action){
    switch(action.type){
        
        case "SIGNUP_MODAL_OPEN":
        {
            return {
                isOpen:true,
                
            };
        }

        case "SIGNUP_MODAL_DONE":
        {
            return {
                isOpen:false,
            };
        }
        case "persist/REHYDRATE":
        {
            var incoming = action.payload.signupModal
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}