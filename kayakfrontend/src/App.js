import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';
import {NotificationContainer} from 'react-notifications';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import SearchResults from './components/SearchResults';

import AuthorizedRoute from './components/AuthorizedRoute';
import UnAuthorizedRoute from './components/UnAuthorizedRoute';
import AdminAccount from './components/adminAccountPage';
import UserBooking from './components/UserBooking';
import AdminAnalysis from './components/AdminAnalysis';
import AdminUserTracking from './components/AdminUserTracking';
const  App = () => {
    return(
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/hotels" component={HomePage}/>
        <Route exact path="/cars" component={HomePage}/>
        <Route exact path="/flights" component={HomePage}/>
        <Route exact path="/account" component={AccountPage}/>
        <Route exact path="/history" component={AccountPage}/>
        <Route exact path="/write-review" component={AccountPage}/>
        <Route exact path="/payment-methods" component={AccountPage}/>
        <Route exact path="/adminLogin" component={AdminLogin}/>
        <Route exact path="/adminHome" component={AdminHome}/>
        <Route exact path="/adminHotels" component={AdminHome}/>
        <Route exact path="/adminFlights" component={AdminHome}/>
        <Route exact path="/adminCars" component={AdminHome}/>
        <Route exact path="/showHotels" component={AdminHome}/>
        <Route exact path="/showFLights" component={AdminHome}/>
        <Route exact path="/showCars" component={AdminHome}/>
        
        <Route exact path="/hotelResults" component={SearchResults}/>
        <Route exact path="/flightResults" component={SearchResults}/>
        <Route exact path="/carResults" component={SearchResults}/>
        <Route exact path="/adminShowHotels" component={AdminHome}/>
        <Route exact path="/adminShowFlights" component={AdminHome}/>
        <Route exact path="/adminShowCars" component={AdminHome}/>
        <Route exact path="/adminUpdateHotel" component={AdminHome}/>
        <Route exact path="/adminUpdateFlight" component={AdminHome}/>
        <Route exact path="/adminUpdateCar" component={AdminHome}/>
        <Route exact path="/adminUpdateUser" component={AdminHome}/>
        <Route exact path="/adminAccount" component={AdminAccount}/>

        <Route exact path="/adminShowUsers" component={AdminHome}/>

        <Route exact path="/booking" component={UserBooking}/>
        <Route exact path="/adminShowBilling" component={AdminHome}/>
        <Route exact path="/adminShowHotelBill" component={AdminHome}/>
        <Route exact path="/adminShowFlightBill" component={AdminHome}/>
        <Route exact path="/adminShowCarBill" component={AdminHome}/>

        <Route exact path="/adminShowBill" component={AdminHome}/>
        <Route exact path="/adminAnalysis" component={AdminAnalysis}/>
        <Route exact path="/adminUserTracking" component={AdminUserTracking}/>

        <NotificationContainer/>
      </div>);
}

export default App;

