import {REHYDRATE} from 'redux-persist/constants';

const initialState="hotels";

export default function(state=initialState,action){
    switch(action.type){
        
        case "SET_ACTIVE_ITEM":
        {
            return action.data;
            
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.activeItem
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}