import {REHYDRATE} from 'redux-persist/constants';

const initialState="hotels";

export default function(state=initialState,action){
    switch(action.type){
        
        case "ADMIN_SET_CURRENT_ITEM":
        {
            return action.data;
            
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.adminCurrentItem
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}