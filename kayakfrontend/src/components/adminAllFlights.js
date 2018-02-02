import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllFlights} from '../actions/adminAllFlights';
import {adminCurrentUpdate} from '../actions/adminCurrentUpdate';

import {withRouter} from 'react-router-dom';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import { ListItem } from 'material-ui/List';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Search from 'material-ui/svg-icons/action/search'; 
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import {
    
    red300,
    fullWhite
  
} from 'material-ui/styles/colors';
class AdminAllFlights extends Component{

    constructor(props){
        super(props);
        this.state={
            flight_name:"",
            dataSource: []
        };
        this.flightNameChange=this.flightNameChange.bind(this);
    }
    
    getAllFlights(){
        API.adminGetAllFlights()
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    this.props.adminAllFlights(data.message.data);
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                console.log("Fail");
                // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
       
    }

    componentWillMount(){
        this.getAllFlights();
    }

    onFlightClick(flight){
        this.props.adminCurrentUpdate(flight);
        this.props.history.push("/adminUpdateFlight");
    }
    deleteFlight(_id){
        API.deleteFlightAdmin({_id:_id})
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                NotificationManager.error("Flight Deleted", "Success", 2500, true);
                this.getAllFlights();
        
            } else if (res.status === 401) {
                console.log("Fail");
                //NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
    }
    
    createFlightsList(){
        return this.props.adminFlights.map((flight) => {
            return(
                <div>
                    <div className="row">
                        <div className="col-md-11">
                            <ListItem onClick={()=>{this.onFlightClick(flight)}} style={{height:"60px"}}>
                                <div className="col-md-2">
                                    {flight.flight_name}
                                </div>
                                <div className="col-md-2">
                                    {flight.origin}
                                </div>
                                <div className="col-md-2">
                                    {flight.destination}
                                </div>
                                <div className="col-md-3">
                                    {flight.departure_date}
                                </div>
                                <div className="col-md-3">
                                    {flight.arrival_date}
                                </div>
                                </ListItem>
                        </div>
                    
                        <div className="col-md-1">
                                <IconButton iconStyle={smallIcon} tooltip="Delete"
                                    >
                            
                                    <Cancel backgroundColor={fullWhite} color={red300}
                                        style={small} 
                                        onClick={()=> this.deleteFlight(flight._id)}/>
                                </IconButton>
                        </div>
                    </div>
                </div>
            )
        });
    }
    
    flightNameChange(value){
        this.setState({flight_name:value});
        API.searchFlightAdmin({flight_name:value})
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    console.log(JSON.stringify(data))
                    this.props.adminAllFlights(data.message.data);
                    var src=[];
                    var respo = data.message.data;
                    respo.map(flight=>{
                        src.push(flight.flight_name);
                    });
                    this.setState({...this.state,dataSource:src})
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
                
            } else if (res.status === 401) {
                console.log("Fail");
                //NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
    }

    searchFlight(){
        console.log(this.state.flight_name);
        API.searchFlightAdmin({flight_name:this.state.flight_name})
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    this.props.adminAllFlights(data.message.data);
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                console.log("Fail");
                //NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
        
    }

    render(){
        return(
            <div>
                <span style={titlestyle}>
                        Flight List 
                </span> 
                <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'100%',marginTop:'7px',marginLeft:'0px'}}/>  
                
                <div className="row" style={{marginLeft:"390px"}}>
                
                        <div className="col-md-2 col-md-offset-4">
                            <label style={{fontWeight:'bold',color: '#333',fontSize:'15px',marginTop:"15px"}}>Search :</label>
                        </div>

                        <div class="col-md-5 ">
                        {/* <input type="text" class="form-control"
                            placeholder="Search" id="inputGroup"
                            onChange={this.carNameChange}
                            /> */}
                            <AutoComplete
                                hintText="Flight Name"
                                dataSource={this.state.dataSource}
                                onUpdateInput={this.flightNameChange}
                                filter={AutoComplete.caseInsensitiveFilter}
                                maxSearchResults	= {5}
                            />
                        
                        </div>
                </div>
                    <br/>
                    
                    <ListItem disabled={true} style={{height:"45px","backgroundColor":"#ec7132"}}>
                        <div className="row" style={{"color":"white",fontSize:"20px"}}>
                            <div className="col-md-11">
                                <div className="col-md-2">
                                    Name
                                </div>
                                <div className="col-md-2">
                                    Origin
                                </div>
                                <div className="col-md-2">
                                    Destination
                                </div>
                                <div className="col-md-3">
                                    Departure Date
                                </div>
                                <div className="col-md-3">
                                    Arrival Date
                                </div>
                            </div>
                        </div>
                    </ListItem>
                    
                {this.createFlightsList()}
            </div>
        )
    }
}
const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}

const smallIcon= {
    width: 20,
    height: 20,
  }
const small={
    width: 20,
    height: 20,
}



const emailStyle = {
    marginBottom: "15px",
    width: "100%",
    height: "2.4em",
    padding: ".3333333em .3333333em .3333333em .6em",
    border: "1px solid #c2c2c6",
    borderRadius: ".0666667em",
    fontFamily: "sans-serif",
    fontSize: "100%",
    lineHeight: "1.15",
}

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminFlights:state.adminFlights
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminAllFlights,
            adminCurrentUpdate,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllFlights));
