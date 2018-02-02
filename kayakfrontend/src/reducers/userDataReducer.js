import {REHYDRATE} from 'redux-persist/constants';
import * as API from '../api/API';
import {changeCarListing} from '../actions/carListingAction';
import {changeFlightListing} from '../actions/flightListingAction';
import {changeHotelListing} from '../actions/hotelListingAction';

const initialState={
    loggedIn: false,
    data:
    {first_name:"",middle_name:"",last_name:"",
        email:"a",
        address:{street:"",city:"",state:"",zip_code:""},
        phone:""
    },
    billing:
    {
        carddetails:{card_name:''}
    },
    hotels:[],
    flights:[],
    cars:[],
    hotelSearch:{},
    flightSearch:{},
    carSearch:{},
    history:[],
    booking:{},
    review:{}
}

export default function(state=initialState,action){
    switch(action.type){
        
        case "CHANGE_USER_DATA":
        {
            return{
                ...state,
                loggedIn: true,
                data: action.data
            };
        }

        case "CHANGE_HOTEL_LISTING":
        {
            return{
                ...state,
                hotels: action.hotels
            };
        }

        case "CHANGE_HOTEL_SEARCH":
        {
            API.doHotelSearch(action.hotelSearch)
            .then((res)=>{
                if(res.status===201){
                    res.json().then(items=>{
                        changeHotelListing(items.data);
                    });
                }
            });
            return{
                ...state,
                hotelSearch: action.hotelSearch
            };
        }

        case "CHANGE_FLIGHT_LISTING":
        {
            return{
                ...state,
                flights: action.flights
            };
        }

        case "CHANGE_FLIGHT_SEARCH":
        {
            API.doFlightSearch(action.flightSearch)
            .then((res)=>{
                if(res.status===201){
                    res.json().then(items=>{
                        console.log(items.data);
                        changeFlightListing(items.data);
                    });
                }
            });
            return{
                ...state,
                flightSearch: action.flightSearch
            };
        }

        case "CHANGE_CAR_LISTING":
        {
            return{
                ...state,
                cars: action.cars
            };
        }

        case "CHANGE_CAR_SEARCH":
        {
            API.doCarSearch(action.carSearch)
            .then((res)=>{
                if(res.status===201){
                    res.json().then(items=>{
                        console.log(items.data);
                        changeCarListing(items.data);    
                    });
                }
            });
            console.log(action.carSearch);
            return{
                ...state,
                carSearch: action.carSearch
            };
        }

        case "CHANGE_BILLING_DATA":
        {
            return{
                ...state,
                billing: action.billing
            };
        }

        case "CHANGE_BOOKING":
        {
            return{
                ...state,
                booking: action.booking,
            };
        }

        case "REMOVE_BOOKING":
        {
            return{
                ...state,
                booking:{}
            }
        }

        case "CHANGE_HISTORY":
        {
            return{
                ...state,
                history: action.history,
            };
        }

        case "SET_REVIEW_DATA":
        {
            return{
                ...state,
                review:action.data
            };
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.userData
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}