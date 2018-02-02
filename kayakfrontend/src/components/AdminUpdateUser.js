import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as API from '../api/API';
import {changeUserData} from '../actions/userDataAction.js';
import { fade } from 'material-ui/utils/colorManipulator';
import {adminCurrentUpdate} from '../actions/adminCurrentUpdate';

const zipregex = /(^\d{5}$)|(^\d{5}-\d{4}$)/ ;
class AdminUpdateUser extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            edit:false,
            
            email:this.props.adminUpdateCurrentData.email,
            first_name:this.props.adminUpdateCurrentData.first_name,
            middle_name:this.props.adminUpdateCurrentData.middle_name,
            last_name:this.props.adminUpdateCurrentData.last_name,
            street:this.props.adminUpdateCurrentData.street,
            state:this.props.adminUpdateCurrentData.state,
            zip_code:this.props.adminUpdateCurrentData.zip_code,
            city:this.props.adminUpdateCurrentData.city,
            phone:this.props.adminUpdateCurrentData.phone

        }
      }

    render(){
        var color = (this.state.edit)?'#ff690f':'#00bcd4';
        return(
            <div>
                <div className="row">
                    <span style={titlestyle}>
                        Details of user with email {<span><b>{this.state.email}</b></span>}
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        First Name
                    </div>
                    <div className="col-md-9">
                        {!this.state.edit
                            ?<div>{this.state.first_name?this.state.first_name:'-'}</div>
                            :<input 
                                id="firstName"
                                type="text" 
                                name="FirstName" 
                                defaultValue={this.state.first_name?this.state.first_name:''}
                                style={inputstyle}
                            />
                        }
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Middle Name
                    </div>
                    <div className="col-md-9">
                        {!this.state.edit
                            ?<div>{this.state.middle_name?this.state.middle_name:'-'}</div>
                            :<input 
                                id="middleName"
                                type="text" 
                                name="MiddleName" 
                                defaultValue={this.state.middle_name?this.state.middle_name:''}
                                style={inputstyle}
                            />
                        }
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Last Name
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{this.state.last_name?this.state.last_name:'-'}</div>
                            :<input 
                                id="lastName"
                                type="text" 
                                name="FirstName" 
                                defaultValue={this.state.last_name?this.state.last_name:''}
                                style={inputstyle}
                            />
                        }
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={bstyle}>
                        Home Address
                    </div>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Street
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{this.state.street?this.state.street:'-'}</div>
                            :<input 
                                id="street"
                                type="text" 
                                name="Street" 
                                defaultValue={this.state.street?this.state.street:''}
                                style={inputstyle}
                            />
                        }
                    </div>
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        City
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{this.state.city?this.state.city:'-'}</div>
                            :<input 
                                id="city"
                                type="text" 
                                name="City" 
                                defaultValue={this.state.city?this.state.city:''}
                                style={inputstyle}
                            />
                        }
                    </div>  
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        State
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{this.state.city?this.state.city:'-'}</div>
                            :<select style={inputstyle} id="state" name="billing_state" class="r9-dropdown-select" title="State/Region"><option value={this.state.state?this.state.city:''} title="State/Region" class="all">State/Region</option><option value="AA">APO Americas</option><option value="AE">APO Europe</option><option value="AP">APO Pacific</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select>
                        }
                    </div>
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Postal Code
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{this.state.zip_code?this.state.zip_code:'-'}</div>
                            :<input 
                                id="postalcode"
                                type="text" 
                                name="postalcode" 
                                defaultValue={this.state.zip_code?this.state.zip_code:''}
                                style={inputstyle}
                            />
                        }
                    </div>  
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Country
                    </div>
                    <div className="col-md-9">
                    <div>USA</div>
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Phone
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{this.state.phone?this.state.phone:'-'}</div>
                            :<input 
                                id="phone"
                                type="text" 
                                name="Phone" 
                                defaultValue={this.state.phone?this.state.phone:''}
                                style={inputstyle}
                            />
                        }
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row">
                    <RaisedButton backgroundColor={color} onClick={()=>{
                        console.log("hello"+this.state.edit);
                        if(!this.state.edit){
                            this.setState({...this.state,edit : true});
                        }
                        else{
                            var first_name = document.getElementById('firstName').value;
                            var last_name = document.getElementById('lastName').value;
                            var middle_name = document.getElementById('middleName').value;
                            var data = {
                                email:      this.state.email,
                                first_name: document.getElementById('firstName').value,
                                last_name:  document.getElementById('lastName').value,
                                middle_name:document.getElementById('middleName').value,
                                street:    document.getElementById('street').value,
                                city:       document.getElementById('city').value,
                                state:      document.getElementById('state').value,
                                zip_code: document.getElementById('postalcode').value,
                                country:    'USA',
                                phone:      document.getElementById('phone').value
                            }
                            if(!(data.zip_code.match(zipregex))){
                                NotificationManager.error("Invalid Zip code", "Zip error", 2500, true);
                            }
                            else{
                                console.log(data);
                                API.updateUserAdmin(data)
                                .then((data1)=>{
                                    if(data1.status===201)
                                    {
                                        NotificationManager.success("Success", "User details updated", 2500, true);
                                        this.props.adminCurrentUpdate(data);
                                        
                                        this.setState({
                                            edit:false,
                                            first_name: document.getElementById('firstName').value,
                                            last_name:  document.getElementById('lastName').value,
                                            middle_name:document.getElementById('middleName').value,
                                            street:    document.getElementById('street').value,
                                            city:       document.getElementById('city').value,
                                            state:      document.getElementById('state').value,
                                            zip_code: document.getElementById('postalcode').value,
                                            country:    'USA',
                                            phone:      document.getElementById('phone').value
                                        });
                                    }
                                    else{
    
                                    }
                                });
                            }
                        }
                    }}>
                        {this.state.edit?"Update":"Edit"}
                    </RaisedButton>
                    {this.state.edit && <FlatButton label="Cancel" hoverColor="white" primary={true} onClick={()=>{this.setState({edit:false});}}/>}
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
const itemstyle={
    height: '20px',
    marginBottom:'35px'
}
const labelstyle={
    fontWeight:'bold',
    color: '#333',
    fontSize:'14px',
}
const bstyle={
    fontSize:'16px',
    fontWeight:'400px',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontWeight:'bold'
}
const inputstyle={
    width: '296px',
    height: '32px',
    marginTop:'-10px'
}

function mapStateToProps(state){
    return{
        adminUpdateCurrentData:state.adminUpdateCurrentData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeUserData,
            adminCurrentUpdate
        }
    ,dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AdminUpdateUser);