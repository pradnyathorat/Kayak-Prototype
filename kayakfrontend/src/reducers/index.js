import {combineReducers} from 'redux';
import loginModal from './loginModalReducer';
import signupModal from './signupModalReducer';
import loginData from './loginReducer';
import signupData from './signupReducer';
import activeItem from './activeItemReducer';
import adminLoginData from './adminLoginReducer';
import userData from './userDataReducer';
import adminCurrentItem from './adminCurrentItem';
import adminActivePage from './adminActivePage';
import userState from './userStateReducer';
import adminHotels from './adminAllHotels';
import adminFlights from './adminAllFlights';
import adminCars from './adminAllCars';
import adminUpdateCurrentData from './adminUpdateCurrentReducer';
import adminUserData from './adminDataReducer';
import adminAllUsersData from './adminAllUsers';
import adminBill from './adminAllBill';


const allReducers = combineReducers({
    loginModal,
    loginData,
    signupModal,
    signupData,
    activeItem,
    adminLoginData,
    userData,
    adminCurrentItem,
    adminActivePage,
    userState,
    adminCars,
    adminFlights,
    adminHotels,
    adminUpdateCurrentData,
    adminUserData,
    adminAllUsersData,
    adminBill,

 });
 
 export default allReducers;