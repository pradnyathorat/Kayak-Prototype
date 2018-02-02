import {REHYDRATE} from 'redux-persist/constants';

const initialState="add";

export default function(state=initialState,action){
    switch(action.type){
        
        case "ADMIN_SET_ACTIVE_PAGE":
        {
            return action.data;
            
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.adminActivePage
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}