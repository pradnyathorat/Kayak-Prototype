import React,{Component} from 'react';
import CustomNavbar from './CustomNavbar';
import {Route} from 'react-router-dom';
import HomeFooter from './HomeFooter';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {withRouter} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import AA from '../images/DL.png';
import PaymentPage from './PaymentPage';

import img4 from '../images/car1.png';
import img5 from '../images/hotel1.jpg';
import ReactStars from 'react-stars';

import person from '../images/person.svg';
import bag from '../images/bag.svg';
import door from '../images/door.svg';
import { NotificationManager } from 'react-notifications';
import * as API from '../api/API';

import {removeBooking} from '../actions/removeBookingAction';


class UserBooking extends Component{

    state = {
        finished: false,
        stepIndex: 0,
        total: 0,
    };
    
    componentWillMount(){
        API.checkSession()
        .then(res => {
            if(res.status == 202){
                this.props.history.push("/");
                NotificationManager.warning('Not a member of Kayak?','Please Login To Continue',5000);
            }
        });
    }
    handleNext = () => {
        var {stepIndex} = this.state;
        
        if(stepIndex==2){
            stepIndex++;
            var booking = this.props.userData.booking;
            if(booking.bookingType==='Car'){
                var car = booking.car;
                var noOfDays = (new Date(booking.search.toDate)-new Date(booking.search.fromDate))/(60*60*24*1000);
                var price = car.car_rental_price;
                var total = price*noOfDays;

                var data = {
                    booking_type: 'Car',
                    email: this.props.userData.data.email,
                    bill_amount: total,
                    car:{
                        car_id : booking.carid,
                        booking_start_date: booking.search.fromDate,
                        booking_end_date: booking.search.toDate,
                        amount: total,
                        car_name : car.car_name,
                        car_type : car.car_type,
                        model_name : car.model_name,
                        city : car.city,
                        notes: ""
                    }
                }
                console.log(data);
                API.doCarBooking(data)
                .then((res)=>{
                    if(res.status===201){
                        NotificationManager.success("Success", "Your Car Booking has been Confirmed", 2500, true);
                        this.setState({
                            stepIndex: stepIndex,
                            finished: stepIndex >= 2,
                        });
                        this.props.removeBooking();
                        this.props.history.push('/cars');
                    }
                });    
            }
            if(booking.bookingType==='Hotel'){
                var hotel = booking.hotel;
                var roomType = booking.roomType;
                if(roomType==="Standard") var index=0;
                if(roomType==="Suite") var index=1;
                if(roomType==="Delux") var index=2;
                var price = hotel.rooms[index].room_price;
                var noOfDays = (new Date(booking.checkOut)-new Date(booking.checkIn))/(60*60*24*1000);
                total = price*booking.noOfRoom*noOfDays;
                var data = {
                    booking_type: 'Hotel',
                    email: this.props.userData.data.email,
                    bill_amount: total,
                    hotel:{
                        hotel_id : booking.hotelid,
                        hotel_name : hotel.hotel_name,
                        city: hotel.address.city,
                        state: hotel.address.state,
                        booking_start_date: booking.checkIn,
                        booking_end_date: booking.checkOut,
                        amount: total,
                        no_of_guests : booking.noOfGuest,
                        no_of_rooms : booking.noOfRoom,
                        room_type:booking.roomType,
                        notes: ""
                    } 
                }
                console.log(data);
                API.doHotelBooking(data)
                .then((res)=>{
                    if(res.status===201){
                        NotificationManager.success("Success", "Your Hotel Booking has been Confirmed", 2500, true);
                        this.setState({
                            stepIndex: stepIndex,
                            finished: stepIndex >= 2,
                        });
                        this.props.removeBooking();
                        this.props.history.push('/hotels');
                    }
                });
            }
            if(booking.bookingType==='Flight'){
                var classType= booking.search.class;
                if(classType==="Business") var index=0;
                if(classType==="Economy") var index=1;
                if(classType==="First Class") var index=2;
        
                var price = booking.flight.classes[index].class_price;
                total = price*booking.search.no_of_traveler;

                var data = {
                    booking_type: 'Flight',
                    email: this.props.userData.data.email,
                    bill_amount: total,
                    flight:{
                        flight_id : booking.flightid,
                        flight_name : booking.flight.flight_name,
                        flight_operator_name:booking.flight.flight_operator_name,
                        flight_start_date: booking.flight.departure_date,
                        flight_end_date: booking.flight.arrival_date,
                        origin:booking.flight.origin,
                        destination:booking.flight.destination,
                        class_type:booking.search.class,
                        no_of_travelers : booking.search.no_of_traveler,
                        amount: total,
                        notes: ""
                    }
                }
                console.log(data);
                API.doFlightBooking(data)
                .then((res)=>{
                    if(res.status===201){
                        NotificationManager.success("Success", "Your Flight Booking has been Confirmed", 2500, true);
                        this.setState({
                            stepIndex: stepIndex,
                            finished: stepIndex >= 2,
                        });
                        this.props.removeBooking();
                        this.props.history.push('/flights');
                    }
                });
            }
        }
        else{
            stepIndex++;
            this.setState({
                stepIndex: stepIndex,
                finished: stepIndex >= 2,
            });
        }
        
    };
    
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    };
    
      renderStepActions(step) {
        const {stepIndex} = this.state;
    
        return (
          <div style={{margin: '12px 20px'}}>
            <RaisedButton
              label={stepIndex === 2 ? 'Finish' : 'Next'}
              disableTouchRipple={true}
              disableFocusRipple={true}
              primary={true}
              onClick={this.handleNext}
              style={{marginRight: 12}}
            />
            {step > 0 && (
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                disableTouchRipple={true}
                disableFocusRipple={true}
                onClick={this.handlePrev}
              />
            )}
          </div>
        );
    }

    showFlightBookingDetails = () => {
        
        var booking = this.props.userData.booking;
        var classType= booking.class;
        if(classType==="Business") var index=0;
        if(classType==="Economy") var index=1;
        if(classType==="First Class") var index=2;
        console.log(index);

        var price = booking.flight.classes[index].class_price;
        var total = price*booking.search.no_of_traveler;

        //this.setState({...this.state,total:total});

        return(
            <div className="row">
                <div className="col-md-7">
                <Paper style={flightstyle} zDepth={3}> 
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="row" style={{marginTop:'30px',marginLeft:'10px'}}>
                                            <img src={AA} style={{width:'32px'}}/>
                                        </div>
                                        <div className="row" style={{marginTop:'20px'}}>
                                            {booking.flight.flight_operator_name}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="row" style={{marginTop:'40px'}}>
                                            {booking.flight.departure_date.slice(11,16)}
                                        </div>
                                        <div className="row" style={{marginTop:'10px'}}>
                                            {booking.flight.departure_date.slice(0,10)}
                                        </div>
                                        <div className="row">
                                            {booking.flight.origin}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="row" style={{marginTop:'60px'}}>
                                            <span style={{width:'100%',height:'2px',display:'inline-block',background:'#717585',position:'relative',margin:'3px 0'}} />
                                        </div>
                                        <div className="row" style={{textAlign:'center'}}>
                                            {'nonstop'}
                                        </div>  
                                    </div>
                                    <div className="col-md-2 col-md-offset-1">
                                        <div className="row" style={{marginTop:'40px'}}>
                                            {booking.flight.arrival_date.slice(11,16)}  
                                        </div>
                                        <div className="row" style={{marginTop:'10px'}}>
                                            {booking.flight.arrival_date.slice(0,10)}  
                                        </div>
                                        <div className="row" >
                                            {booking.flight.destination}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="row" style={{marginTop:'50px'}}>
                                            {'21h 50m'}
                                            {booking.flight.duration}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    
                                </div>
                            </div>
                        </div>
                </Paper>
                </div>
                <div className="col-md-4">
                <Paper style={{...flightstyle,width:'250px',marginLeft:'-100px'}} zDepth={3}>
                    <div className="row">
                        Name: {this.props.userData.data.first_name}
                        <br/>
                        Class: {booking.class}
                        <br/>
                        No Of Travellers: {booking.search.no_of_traveler}
                        <br/>
                        Price: 
                        {price}
                        {/* {(booking.flight.classes[0].class_type === booking.search.class) && booking.flight.classes[0].class_price}
                        {(booking.flight.classes[1].class_type === booking.search.class) && booking.flight.classes[1].class_price}
                        {(booking.flight.classes[2].class_type === booking.search.class) && booking.flight.classes[2].class_price} */}
                        <br/>
                        Total: 
                        {total}
                        {/* {(booking.flight.classes[0].class_type === booking.search.class) && booking.flight.classes[0].class_price*booking.search.no_of_traveler}
                        {(booking.flight.classes[1].class_type === booking.search.class) && booking.flight.classes[1].class_price*booking.search.no_of_traveler}
                        {(booking.flight.classes[2].class_type === booking.search.class) && booking.flight.classes[2].class_price*booking.search.no_of_traveler} */}
                    </div>
                </Paper>
                </div>
            </div>
        )
    }

    showHotelBookingDetails = () => {

        var booking = this.props.userData.booking;
        var hotel = booking.hotel;
        var roomType = booking.roomType;
        if(roomType==="Standard") var index=0;
        if(roomType==="Suite") var index=1;
        if(roomType==="Delux") var index=2;
        var price = hotel.rooms[index].room_price;
        var noOfDays = (new Date(booking.checkOut)-new Date(booking.checkIn))/(60*60*24*1000);
        var total = price*booking.noOfRoom*noOfDays;
        //this.setState({...this.state,total:total});
        return(
            <div className="row">
                <div className="col-md-7">
                <Paper style={flightstyle} zDepth={3}> 
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                <div className="col-md-4" style={{padding:'0px'}}>
                                    <img src={img5} style={{marginLeft:'-25px',width:'200px'}}/>
                                </div>
                                <div className="col-md-8">
                                    <div className="row" style={{padding:'10px',height:'100%'}}>
                                        <div className="col-md-12">
                                            <div className="row" style={{fontSize:'19px',color:'#0f0f0f',lineHeight:'22px',fontWeight:'500px'}}>
                                                {hotel.hotel_name.toUpperCase()}
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <ReactStars
                                                        count={7}
                                                        size={20}
                                                        color2={'#212121'} 
                                                        value={hotel.stars}
                                                        edit={false}
                                                    />
                                                </div>
                                                {(hotel.stars>=5) && <div className="col-md-5" style={{backgroundColor:'#8b8b8e',marginTop:'7px',color:'white',borderRadius:'4px',textAlign:'center',fontSize:'11px'}}>
                                                    Top Luxury Hotel
                                                </div>}
                                            </div>
                                            <div className="row" style={{marginTop:'20px'}}>
                                                <div className="col-md-2" style={{width:'50px',height:'40px',backgroundColor:'#558fe6',color:'white',fontSize:'15px',borderRadius:'5px',lineHeight:'40px'}}>
                                                    {'8.4'}
                                                </div>
                                                <div className="col-md-6">
                                                    {'Excellent'}
                                                    <br/>
                                                    {'1000 reviews'}
                                                </div>
                                            </div>
                                            <div className="row" style={{marginTop:'10px',marginLeft:'0px'}}>
                                                {hotel.address.street}
                                                <br></br>
                                                {hotel.address.city}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    
                                </div>
                            </div>
                        </div>
                </Paper>
                </div>
                <div className="col-md-4">
                <Paper style={{...flightstyle,width:'250px',marginLeft:'-100px'}} zDepth={3}>
                    <div className="row">
                        Name: {this.props.userData.data.first_name}
                        <br/>
                        Room Type: {booking.roomType}
                        <br/>
                        No Of Guests: {booking.noOfGuest}
                        <br/>
                        No Of Rooms: {booking.noOfRoom}
                        <br/>
                        CheckIn Date: {booking.checkIn}
                        <br/>
                        CheckOut Date: {booking.checkOut}
                        <br/>
                        Price: {price}
                        
                        <br/>
                        Total: {total}
                        
                    </div>
                </Paper>
                </div>
            </div>
        )
    }
    showCarBookingDetails = () => {
        var booking = this.props.userData.booking;
        var car = booking.car;
        var noOfDays = (new Date(booking.search.toDate)-new Date(booking.search.fromDate))/(60*60*24*1000);
        var price = car.car_rental_price;
        var total = price*noOfDays;
        //this.setState({...this.state,total:total});
        return(
            <div className="row">
                <div className="col-md-7">
                <Paper style={flightstyle} zDepth={3}> 
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                <div className="col-md-8" style={{padding:'0px',marginTop:'10px'}}>
                                    <div className="row" style={{fontSize:'20px',fontWeight:'400'}}>
                                        {(car.car_type==='Small' || car.car_type==='Medium') && 'Compact'}
                                        {(car.car_type==='Large' || car.car_type==='SUV') && 'Economy'}
                                        {(car.car_type==='Pickup Truck' || car.car_type==='Commercial') && 'Commercial'}
                                        {(car.car_type==='Luxury') && 'Luxury'}
                                        {(car.car_type==='Van') && 'Van'}
                                    </div>
                                    <div className="row" style={{fontSize:'15px', fontWeight:'900',marginTop:'20px'}}>
                                        {car.car_name}
                                    </div>
                                    <div className="row" style={{fontSize:'13px', fontWeight:'500',marginTop:'20px'}}>
                                        {car.model_name}
                                    </div>
                                    <div className="row" style={{}}>
                                    <span style={{width:'100%',height:'1px',display:'inline-block',background:'#e4e5ea',position:'relative',margin:'3px 0'}} />
                                    </div>
                                    <div className="row" style={{fontWeight:'900',marginTop:'10px'}}>
                                        <div className="col-md-2">
                                            <img src={person}/>
                                        </div>
                                        <div className="col-md-2">
                                            {car.specification.no_of_passengers}
                                        </div>
                                        <div className="col-md-2">
                                            <img src={bag}/>
                                        </div>
                                        <div className="col-md-2">
                                            {car.specification.luggage_capacity}
                                        </div>
                                        <div className="col-md-2">
                                            <img src={door}/>
                                        </div>
                                        <div className="col-md-2">
                                            4
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row" style={{padding:'5px',backgroundColor:'#8b8b8e',marginTop:'7px',color:'white',borderRadius:'4px',textAlign:'center',fontSize:'11px'}}>
                                        GREAT DEAL
                                    </div>
                                    <div className="row">
                                        <img src={img4} style={{width:'150px',marginTop:'20px'}}/>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                </Paper>
                </div>
                <div className="col-md-4">
                <Paper style={{...flightstyle,width:'250px',marginLeft:'-100px'}} zDepth={3}>
                    <div className="row">
                        Name: {this.props.userData.data.first_name}
                        <br/>
                        No Of Days: {noOfDays}
                        <br/>
                        Price: {price}
                        <br/>
                        Total: {total}
                    </div>
                </Paper>
                </div>
            </div>
        )
    }

    showPaymentDetails = () => {
        return(
            <Paper style={paymentstyle} zDepth={3}>
                <PaymentPage/>
            </Paper>
        )
    }

    finalBooking = () => {
        var booking = this.props.userData.booking;
        var total = 0;
        if(booking.bookingType==='Car'){
            var car = booking.car;
            var noOfDays = (new Date(booking.search.toDate)-new Date(booking.search.fromDate))/(60*60*24*1000);
            var price = car.car_rental_price;
            total = price*noOfDays;    
        }
        if(booking.bookingType==='Hotel'){
            var hotel = booking.hotel;
            var roomType = booking.roomType;
            if(roomType==="Standard") var index=0;
            if(roomType==="Suite") var index=1;
            if(roomType==="Delux") var index=2;
            var price = hotel.rooms[index].room_price;
            var noOfDays = (new Date(booking.checkOut)-new Date(booking.checkIn))/(60*60*24*1000);
            total = price*booking.noOfRoom*noOfDays;
        }
        if(booking.bookingType==='Flight'){
            var classType= booking.search.class;
            if(classType==="Business") var index=0;
            if(classType==="Economy") var index=1;
            if(classType==="First Class") var index=2;
    
            var price = booking.flight.classes[index].class_price;
            total = price*booking.search.no_of_traveler; 
        }  

        return(
            <Paper style={paperstyle} zDepth={3}>
                Total Amount: ${total}
            </Paper>
        )
    }
    render(){
        const {finished, stepIndex} = this.state;
        return(
            <div>
                <div className="row">
                    <div className="col-md-12" style={{backgroundColor:'black',height:'46px'}}>
                        <div className="row" style={navstyle}>
                            <CustomNavbar />
                        </div>
                    </div>
                </div>
                <div className="row" style={{margin:'20px -30px 0px 50px',height:'50px',fontSize:'30px',fontWeight:'500px'}}>
                    {this.props.userData.booking.bookingType} Booking
                </div>
                <div className="row" style={{marginRight:'-30px',minHeight:'90vh'}}>
                <div style={{ margin: '20px 50px 50px 50px'}}>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel style={{fontSize:'18px',color:'#00bcd4'}}>Booking Details</StepLabel>
                        <StepContent>
                        {this.props.userData.booking.bookingType==="Flight" && this.showFlightBookingDetails()}
                        {this.props.userData.booking.bookingType==="Hotel" && this.showHotelBookingDetails()}
                        {this.props.userData.booking.bookingType==="Car" && this.showCarBookingDetails()}
                        {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel style={{fontSize:'18px',color:'#00bcd4'}}>Confirm Your Payment</StepLabel>
                        <StepContent>
                        {this.showPaymentDetails()}
                        {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel style={{fontSize:'18px',color:'#00bcd4'}}>Confirm Your Booking</StepLabel>
                        <StepContent>
                        {this.finalBooking()}
                        {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                    </Stepper>
                </div>
                </div>
                <div className="row" >
                    <HomeFooter />
                </div>
            </div>
        )
    }
}

const navstyle={
    marginLeft:'120px',
    marginRight:'120px'
}

const paperstyle = {
    height: 60,
    width: 600,
    margin: 20,
    fontSize:'30px',
    fon:'900',
    display: 'inline-block',
    padding:'15px'
  };

const flightstyle = {
    height: 200,
    width: 600,
    margin: 20,
    display: 'inline-block',
    padding:'15px 20px 15px 50px'
  };

const paymentstyle = {
    height: 750,
    width: 1100,
    margin: 20,
    display: 'inline-block',
    padding:'15px 20px 15px 50px'
  };

function mapStateToProps(state){
    return{
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            removeBooking,
        }
    ,dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(UserBooking));