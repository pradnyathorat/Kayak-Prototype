import React,{Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeHistoryData} from '../actions/historyAction.js';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import * as API from '../api/API';
import Paper from 'material-ui/Paper';

import IconHotel from '../icons/IconHotel';
import IconFlight from '../icons/IconFlight';
import IconCar from '../icons/IconCar';

import ReviewIcon from '../icons/review.svg';
import {withRouter} from 'react-router-dom';
import {setReviewData} from '../actions/reviewAction';
class HistoryPage extends Component
{
    state = {
        filter: 'Current'
    }

    componentWillMount(){
        this.getAllBookings();
    }

    getAllBookings = () => {
        var email = this.props.userData.data.email;
        API.getAllBookings({email})
        .then((res)=>{
            if(res.status===201){
                res.json().then(history=>{
                    console.log(history);
                    this.props.changeHistoryData(history.data);
                });
            }
        });
    }

    
    showHistory = () => {
        var history = this.props.userData.history;
        console.log(history);
        var result =[];
        if(this.state.filter==='All'){result=history.filter(booking=>(booking.time=='past' || booking.time=='future'));}
        if(this.state.filter==='Past'){result=history.filter(booking=>(booking.time=='past'));}
        if(this.state.filter==='Current'){result=history.filter(booking=>(booking.time=='future'));}
        console.log(result);
        return result.map(booking=>(
            <div>
                <Paper style={style} zDepth={1}>
                    <div className="row" style={{marginTop:'13px'}}>
                        <div className="col-md-1">
                            {booking.bill_type==='Car' && <IconCar width="24" height="24" color="#000000"/>}
                            {booking.bill_type==='Hotel' && <IconHotel width="24" height="24" color="#000000"/>}
                            {booking.bill_type==='Flight' && <IconFlight width="24" height="24" color="#000000"/>}
                        </div>
                        <div className="col-md-4">
                            {booking.bill_type==='Car' && booking.car.city}
                            {booking.bill_type==='Hotel' && booking.hotel.city}
                            {booking.bill_type==='Flight' && booking.flight.origin+"-"+booking.flight.destination}
                        </div>
                        <div className="col-md-5">
                            {booking.bill_type==='Car' && booking.car.booking_start_date.slice(0,10)+" to "+booking.car.booking_end_date.slice(0,10)}
                            {booking.bill_type==='Hotel' && booking.hotel.booking_start_date.slice(0,10)+" to "+booking.hotel.booking_end_date.slice(0,10)}
                            {booking.bill_type==='Flight' && booking.flight.flight_start_date.slice(0,10)+" to "+booking.flight.flight_end_date.slice(0,10)}
                        </div>
                        <div className="col-md-1">
                            {booking.bill_type==='Car' && '$'+booking.bill_amount}
                            {booking.bill_type==='Hotel' && '$'+booking.bill_amount}
                            {booking.bill_type==='Flight' && '$'+booking.bill_amount}
                        </div>
                        <div className="col-md-1">
                            {booking.bill_type==='Car' && booking.time=='past' && <img src={ReviewIcon} width="24" height="24" color="#000000" style={{cursor:"pointer"}} onClick={()=>this.redirectToReview(booking)}/>}
                            {booking.bill_type==='Hotel' &&  booking.time=='past' && <img src={ReviewIcon} width="24" height="24" color="#000000" style={{cursor:"pointer"}} onClick={()=>this.redirectToReview(booking)}/>}
                            {booking.bill_type==='Flight'  && booking.time=='past' && <img src={ReviewIcon} width="24" height="24" color="#000000" style={{cursor:"pointer"}} onClick={()=>this.redirectToReview(booking)}/>}
                        </div>
                    </div>
                </Paper>
            </div>
        ))
    }

    redirectToReview(booking){
        console.log(JSON.stringify(booking));
        this.props.setReviewData(booking);
        this.props.history.push("/write-review");
    }

    handleSelect = (event,value) => this.setState({...this.state,filter:value})
    render(){
        return(
            <div>
                <div className="row">
                    <span style={titlestyle}>
                        History
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <RadioButtonGroup 
                        name="history" 
                        defaultSelected="Current"
                        onChange={this.handleSelect}>
                            <RadioButton
                                value="All"
                                label="All"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="Past"
                                label="Past"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="Current"
                                label="Current"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup>
                    </div>
                    <div className="col-md-10">
                        {this.showHistory()}
                    </div>
                </div>
            </div>
        )
    }
}

const style = {
    height: 40,
    width: 740,
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
};

const styles = {
    block: {
      maxWidth: 250,
    },
    radioButton: {
      marginBottom: 16,
    },
};

const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}
function mapStateToProps(state){
    return{
        userData:state.userData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeHistoryData,
            setReviewData
        }
    ,dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(HistoryPage));