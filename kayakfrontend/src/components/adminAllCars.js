import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllCars} from '../actions/adminAllCars';
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
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import {
    
    red300,
    fullWhite
  
  } from 'material-ui/styles/colors';
class AdminAllCars extends Component{

    constructor(props){
        super(props);
        this.state={
            car_name:"",
            dataSource: []
        }
       this.carNameChange = this.carNameChange.bind(this);
    }
    
    getAllCars(){
        API.adminGetAllCars()
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    this.props.adminAllCars(data.message.data)
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                console.log("Fail");
                NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
    }
        

    componentWillMount(){
        this.getAllCars();
    }

    onCarClick(car){
        this.props.adminCurrentUpdate(car);
        this.props.history.push("/adminUpdateCar");
    }

    deleteCar(_id){
        API.deleteCarAdmin({_id:_id})
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                this.getAllCars();
        
            } else if (res.status === 401) {
                console.log("Fail");
                NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
    }

    createCarsList(){
        return this.props.adminCars.map((car) => {
            return(
                <div className="row">
                    <div className="col-md-11">
                        <ListItem onClick={()=>{this.onCarClick(car)}} style={{height:"60px"}}>
                            <div className="col-md-3">
                                {car.car_name}
                            </div>
                            <div className="col-md-3">
                                {car.car_type}
                            </div>
                            <div className="col-md-3">
                                {car.model_name}
                            </div>
                            <div className="col-md-3">
                                {car.car_rental_price}
                            </div>
                        </ListItem>
                    </div>
                    <div className="col-md-1">
                            <IconButton iconStyle={smallIcon} tooltip="Delete"
                                onClick={()=> this.deleteCar(car._id)}>
                        
                                <Cancel backgroundColor={fullWhite} color={red300}
                                    style={small} 
                                    onClick={()=> this.deleteCar(car._id)}/>
                                    
                            </IconButton>
                    </div>
                </div>
            )
        });
    }
    carNameChange(value){
        this.setState({car_name:value});
        API.searchCarAdmin({car_name:value})
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    console.log(JSON.stringify(data))
                    this.props.adminAllCars(data.message.data);
                    var src=[];
                    var respo = data.message.data;
                    respo.map(car=>{
                        src.push(car.car_name);
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

    searchCar(){
        console.log(this.state.car_name);
        API.searchCarAdmin({car_name:this.state.car_name})
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    this.props.adminAllCars(data.message.data)
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
                        Car List 
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
                                hintText="Car Name"
                                dataSource={this.state.dataSource}
                                onUpdateInput={this.carNameChange}
                                filter={AutoComplete.caseInsensitiveFilter}
                                maxSearchResults	= {5}
                            />
                        
                        </div>
                </div>
                <br/>
                    
                <div>
                    <ListItem disabled={true} style={{height:"45px","backgroundColor":"#ec7132"}}>
                        <div className="row" style={{"color":"white",fontSize:"20px"}}> 
                            <div className="col-md-11">
                                <div className="col-md-3">
                                    Car Name
                                </div>
                                <div className="col-md-3">
                                    Car Type
                                </div>
                                <div className="col-md-3">
                                    Model Name
                                </div>
                                <div className="col-md-3">
                                    Rental Price
                                </div>
                            </div>
                        </div>
                    </ListItem>
                </div>
                <Divider/>
                <Divider/>
                {this.createCarsList()}
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

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminCars:state.adminCars,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminAllCars,
            adminCurrentUpdate,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllCars));
