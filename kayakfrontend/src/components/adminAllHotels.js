import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllHotels} from '../actions/adminAllHotels';

import {withRouter} from 'react-router-dom';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import { ListItem } from 'material-ui/List';

import ReactStars from 'react-stars';

import {adminCurrentUpdate} from '../actions/adminCurrentUpdate';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import {
    
    red300,
    fullWhite
  
  } from 'material-ui/styles/colors';
class AdminAllHotels extends Component{

    constructor(props){
        super(props);
        this.state={
            hotel_name:"",
            dataSource: []
        };
        this.hotelNameChange=this.hotelNameChange.bind(this);
    }
    
    getAllHotels(){
        API.adminGetAllHotels()
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    console.log(JSON.stringify(data))
                    this.props.adminAllHotels(data.message.data);
                    //NotificationManager.success("Success", data.message, 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                
                NotificationManager.error("Fail", "Fail", 2500, true);
                // this.props.history.push("/");
            } 
        });
        // this.props.adminAllHotels([{"hotel_id":"1","hotel_name":"Taj","address":{"street":"201 S 4th","city":"San Jose","zip_code":"95112",
        //     "state":"CA","country":"US"},"stars":7,"rooms":[{"room_id":"1","room_type":"Standard","room_price":1000}],"avg_rating":4,
        //   "reviews":{"ratings":"3","feedback":"good","user_id":"1"}}])
    }

    componentWillMount(){
        this.getAllHotels();
    }
    onHotelClick(hotel){
        this.props.adminCurrentUpdate(hotel);
        this.props.history.push("/adminUpdateHotel");
    }

    deleteHotel(_id){
        console.log("id is:"+_id);
        API.deleteHotelAdmin({_id:_id})
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                NotificationManager.error("Hotel Deleted", "Success", 2500, true);
                var h_name = this.state.hotel_name;
                if(h_name != ""){
                    this.searchHotel();
                }
                else{
                    this.getAllHotels();
                }
                
        
            } else if (res.status === 401) {
                console.log("Fail");
                //NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
    }

    createHotelsList(){
        return this.props.adminHotels.map((hotel) => {
            return(
                <div>
                    <div className="row">
                        <div className="col-md-11">
                            <ListItem onClick={()=>{this.onHotelClick(hotel)}} style={{height:"60px"}}>
                                <div className="col-md-2">
                                    {hotel.hotel_name}
                                </div>
                                <div className="col-md-2">
                                    {hotel.street}
                                </div>
                                <div className="col-md-2">
                                    {hotel.city}
                                </div>
                                <div className="col-md-2">
                                    {hotel.state}
                                </div>
                                <div className="col-md-1">
                                    {hotel.zip_code}
                                </div>
                                <div className="col-md-3">
                                    <ReactStars
                                        count={7}
                                        edit={false}
                                        size={24}
                                        color2={'#ffd700'} 
                                        value={hotel.stars}
                                        size="30px"
                                    />
                                    
                                </div>
                                
                            </ListItem>
                            
                        </div>
                        <div className="col-md-1">
                            <IconButton iconStyle={smallIcon} tooltip="Delete"
                                >
                        
                                <Cancel backgroundColor={fullWhite} color={red300}
                                    style={small} 
                                    onClick={()=> this.deleteHotel(hotel._id)}/>
                            </IconButton>
                        </div>
                    </div>
                    
                   
                </div>
            )
        });
    }

    hotelNameChange(value){
        this.setState({hotel_name:value});
        API.searchHotelAdmin({hotel_name:value})
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    console.log(JSON.stringify(data))
                    this.props.adminAllHotels(data.message.data);
                    var src=[];
                    var respo = data.message.data;
                    respo.map(hotel=>{
                        src.push(hotel.hotel_name);
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

    searchHotel(){
        console.log(this.state.hotel_name);

        if((this.state.hotel_name).length >2){
            API.searchHotelAdmin({hotel_name:this.state.hotel_name})
            .then((res) => {
                if (res.status === 201) {
                    res.json().then(data => {
                        console.log(JSON.stringify(data))
                        this.props.adminAllHotels(data.message.data);
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
        
        
    }

    render(){
        return(
            <div>
                <span style={titlestyle}>
                        Hotel List  
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
                            hintText="Hotel Name"
                            dataSource={this.state.dataSource}
                            onUpdateInput={this.hotelNameChange}
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
                                Hotel
                            </div>
                            <div className="col-md-2">
                                Street
                            </div>
                            <div className="col-md-2">
                                City
                            </div>
                            <div className="col-md-2">
                                State
                            </div>
                            <div className="col-md-1">
                                Zip
                            </div>
                            <div className="col-md-3">
                                Stars
                            </div>
                        </div>
                    </div>
                </ListItem>
                <Divider/>
                <Divider/>
                {this.createHotelsList()}
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
        adminHotels:state.adminHotels
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminAllHotels,
            adminCurrentUpdate,
            
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllHotels));
