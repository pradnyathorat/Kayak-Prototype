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
import TextField from 'material-ui/TextField';
import ReactStars from 'react-stars';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import RaisedButton from 'material-ui/RaisedButton';
import {
    blue500,
    
  
  } from 'material-ui/styles/colors';

class WriteReview extends Component
{
    constructor(props){
        super(props);
        this.state={
            stars:"",
            comment:""
        }
    }

    handleRatingChange = (value) => {
        this.setState({...this.state,stars:value});
    };

    handleCommentChange = (event) => {
        this.setState({...this.state,comment:event.target.value});
    }

    writeReview(){
        var ob = {...this.props.userData.review,stars:this.state.stars,comment:this.state.comment};
        console.log(JSON.stringify(ob));
        var send={};
        if(ob.bill_type === "Hotel"){
            send={
                bill_id : ob._id,
                email: ob.email,
                rating : ob.stars,
                comment : ob.comment,
                booking_type : "Hotel",
                hotel_id : ob.hotel.hotel_id,
            };
        }
        else if(ob.bill_type === "Flight"){
            send={
                bill_id : ob._id,
                email: ob.email,
                rating : ob.stars,
                comment : ob.comment,
                booking_type : "Flight",
                flight_id : ob.flight.flight_id,
            };
        }
        else{
            send={
                bill_id : ob._id,
                email: ob.email,
                rating : ob.stars,
                comment : ob.comment,
                booking_type : "Car",
                car_id : ob.car.car_id,
            };
        }
        console.log(JSON.stringify(send));

        API.createReview({data:send})
        .then(res=>{
            if(res.status === 201){
                NotificationManager.success("Review Added","Success",2500,true);
                this.props.history.push("/history");
            }
        })
        
        
    }

    backPressed(){
        this.props.history.push("/history");
    }

    render(){
        return(
            <div>
                <div className="row">
                    <span style={titlestyle}>
                        Write Review
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
                <div className="row">
                    <TextField
                        hintText="Write a Review"
                        floatingLabelText="Review"
                        multiLine={true}
                        rows={1}
                        rowsMax={5}
                        onChange={this.handleCommentChange}
                        style ={{width:"800px"}}
                        />
                <br />
                <div className="row" style={{marginTop:"60px"}}>
                    <div className="col-md-1">
                        <label style={{fontWeight:'bold',color: '#333',fontSize:'15px',marginTop:"5px"}} >
                            Rating:
                        </label>
                    </div>
                    <div>
                        <ReactStars
                            count={5}
                            onChange={this.handleRatingChange}
                            size={24}
                            color2={'#ffd700'} 
                            value={this.state.stars}
                        />
                    </div>
                    
                </div>
                <div className="row" style={{marginTop:"30px",marginLeft:"0px"}}>
                    <RaisedButton primary={true}
                        onClick={()=>{this.writeReview()}}
                    >
                        Submit
                    </RaisedButton>
                    <RaisedButton style={{marginLeft:"10px"}}
                        onClick={()=>{this.backPressed()}}
                    >
                        Back
                    </RaisedButton>
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
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeHistoryData,
        }
    ,dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(WriteReview));