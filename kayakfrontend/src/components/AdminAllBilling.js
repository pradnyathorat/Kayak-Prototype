import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminAllBill} from '../actions/adminAllBill';

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
import {
    
    red300,
    fullWhite
  
  } from 'material-ui/styles/colors';
class AdminAllBilling extends Component{

    
    getAllBilling(){
        // API.adminGetAllBilling()
        // .then((res) => {
        //     if (res.status === 201) {
        //         console.log("Success");
        //         res.json().then(data => {
        //             console.log(JSON.stringify(data))
        //             this.props.adminAllBill(data.message.data);
        //             //NotificationManager.success("Success", data.message, 2500, true);
        //             // this.props.history.push("/logs");
        //         });
        
        //     } else if (res.status === 401) {
                
        //         NotificationManager.error("Fail", "Fail", 2500, true);
        //         // this.props.history.push("/");
        //     } 
        // });
        // this.props.adminAllHotels([{"hotel_id":"1","hotel_name":"Taj","address":{"street":"201 S 4th","city":"San Jose","zip_code":"95112",
        //     "state":"CA","country":"US"},"stars":7,"rooms":[{"room_id":"1","room_type":"Standard","room_price":1000}],"avg_rating":4,
        //   "reviews":{"ratings":"3","feedback":"good","user_id":"1"}}])

        
        this.props.adminAllBill({"_id":"1","bill_type":""})
    }

    componentWillMount(){
        this.getAllBilling();
    }
    onBillClick(bill){
        this.props.adminCurrentUpdate(bill);
        this.props.history.push("/adminShowBill");
    }

    createHotelBillList(){
        return this.props.adminBill.map((bill) => {
            return(
                <div>
                    
                </div>
            )
        });
    }

    createFlightBillList(){
        return this.props.adminBill.map((bill) => {
            return(
                <div>
                    
                </div>
            )
        });
    }

    createCarBillList(){
        return this.props.adminBill.map((bill) => {
            return(
                <div>
                    
                </div>
            )
        });
    }

    
    // searchHotel(){
    //     console.log(this.state.hotel_name);
    //     API.searchHotelAdmin({hotel_name:this.state.hotel_name})
    //     .then((res) => {
    //         if (res.status === 201) {
    //             res.json().then(data => {
    //                 console.log(JSON.stringify(data))
    //                 this.props.adminAllHotels(data.message.data);
    //                 //NotificationManager.success("Success", data.message, 2500, true);
    //                 // this.props.history.push("/logs");
    //             });
                
    //         } else if (res.status === 401) {
    //             console.log("Fail");
    //             //NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
    //             // this.props.history.push("/");
    //         } 
    //     });
        
    // }

    render(){
        return(
            <div>
                {this.props.adminBill.bill_type == "Hotel" &&
                <div>
                    <ListItem disabled={true} style={{height:"45px","backgroundColor":"#ec7132"}}>
                        <div className="row" style={{"color":"white",fontSize:"20px"}}> 
                            <div className="col-md-11">
                                <div className="col-md-2">
                                    Hotel
                                </div>
                                <div className="col-md-3">
                                    Street
                                </div>
                                <div className="col-md-2">
                                    City
                                </div>
                                <div className="col-md-1">
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
                    {this.createHotelBillList()}
                </div>
                }
            </div>
        )
    }
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
        adminBill:state.adminBill
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,
            adminCurrentUpdate,
            adminAllBill
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAllBilling));
