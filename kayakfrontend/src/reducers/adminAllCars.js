import {REHYDRATE} from 'redux-persist/constants';

const initialState=[];

export default function(state=initialState,action){
    switch(action.type){
        
        case "ADMIN_ALL_CARS":
        {
            return action.data;
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.adminCars
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}