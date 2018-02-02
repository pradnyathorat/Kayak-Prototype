import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import {withRouter} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import * as API from '../api/API';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class AdminFlights extends Component{

    constructor(props) {
        super(props);
        this.state = {
            flight_name:"",
            flight_operator_name:"",
            departure_date: "",
            arrival_date:"",
            origin:"",
            destination:"",
            business_class_price:"",
            economy_class_price:"",
            first_class_price:""
        };
      }
      
      handleNameChange = (event, index, value) => {
        this.setState({...this.state,flight_name:event.target.value});
      };
      handleOperatorChange = (event, index, value) => {
        this.setState({...this.state,flight_operator_name:event.target.value});
      };
      handleDepartureDateChange = (event, date) => {
          console.log();
        this.setState({...this.state,departure_date:date});
      };
      handleDepartureTimeChange = (event, time) => {
        var DDate=this.state.departure_date;
        var hours = time.getHours();
        var minutes = time.getMinutes();

        DDate.setHours(hours);
        DDate.setMinutes(minutes);
        console.log(DDate);
        this.setState({...this.state,departure_date:DDate});
      };
      handleArrivalDateChange = (event, date) => {
        this.setState({...this.state,arrival_date:date});
      };
      handleArrivalTimeChange = (event, time) => {
        var DDate=this.state.arrival_date;
        var hours = time.getHours();
        var minutes = time.getMinutes();

        DDate.setHours(hours);
        DDate.setMinutes(minutes);
        console.log(DDate);
        this.setState({...this.state,arrival_date:DDate});
      };
      handleOriginChange = (event, index, value) => {
        this.setState({...this.state,origin:event.target.value});
      };
      handleDestinationChange = (event, index, value) => {
        this.setState({...this.state,destination:event.target.value});
      };
      handleBusinessClassPriceChange = (event, index, value) => {
        this.setState({...this.state,business_class_price:event.target.value});
      };
      handleEconomyClassPriceChange = (event, index, value) => {
        this.setState({...this.state,economy_class_price:event.target.value});
      };
      handleFirstClassPriceChange = (event, index, value) => {
        this.setState({...this.state,first_class_price:event.target.value});
      };


      submitFlight() {
          console.log(this.state);
          API.addFlightAdmin(this.state)
          .then((res) => {
              if (res.status === 201) {
                  console.log("Success");
                  res.json().then(data => {
                      NotificationManager.success("Success", "Flight Added Successfully", 2500, true);
                      // this.props.history.push("/logs");
                  });
          
              } else if (res.status === 401) {
                  // console.log("Fail");
                  // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                  // this.props.history.push("/");
              } 
          });
      }
    render(){
        return(
            <div>
                <span style={titlestyle}>
                        Add Flight
                </span> 
                <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'100%',marginTop:'7px',marginLeft:'0px'}}/>  
                

                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="flight_name"
                        hintText="Flight Name"
                        onChange={this.handleNameChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="operator_name"
                        hintText="Flight Operator Name"
                        onChange={this.handleOperatorChange}
                    />
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <DatePicker style={istyle} hintText="Departure Date" container="inline" autoOk={true}
                            onChange={this.handleDepartureDateChange} />
                    </div>
                    <div className="col-md-4">
                        <TimePicker
                            hintText="Departure Time"
                            autoOk={true}
                            onChange={this.handleDepartureTimeChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <DatePicker style={istyle} hintText="Arrival Date" container="inline" autoOk={true}
                            onChange={this.handleArrivalDateChange}/>
                    </div>
                    <div className="col-md-4">
                        <TimePicker
                            hintText="Arrival Time"
                            autoOk={true}
                            onChange={this.handleArrivalTimeChange}
                        />
                    </div>
                </div>
                    
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="origin"
                        hintText="Origin"
                        onChange={this.handleOriginChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="destination"
                        hintText="Destination"
                        onChange={this.handleDestinationChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="business_price"
                        hintText="Business Class Price"
                        onChange={this.handleBusinessClassPriceChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="economy_class"
                        hintText="Economy Class Price"
                        onChange={this.handleEconomyClassPriceChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="first_class"
                        hintText="First Class Price"
                        onChange={this.handleFirstClassPriceChange}
                    />
                </div>
                <br/>
                <div className="row" style={divstyle}>
                    <button style={btnstyle}
                        id="destbtn"
                        onClick={()=>{this.submitFlight()}}
                    >
                    Add Flight
                    </button>
                </div>
            </div>
        )
    }
}
const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}
const rstyle={
    marginTop:'50px',
    marginRight:'15px',
    marginLeft:'15px'
}

const istyle={
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    
}

const roomStyle={
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    marginTop:"20px"
}

const btnstyle={
    border:'none',
    color:"white",
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'#ec7132',
    marginLeft:'5px',
    marginRight:'5px'
}
const divstyle={
    marginLeft:'1px',
    marginRight:'-2px',
    width:"300px"
}

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminFlights));
