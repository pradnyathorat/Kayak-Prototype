import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as API from '../api/API';
import {changeUserData} from '../actions/userDataAction.js';

const zipregex = /(^\d{5}$)|(^\d{5}-\d{4}$)/ ;
class Preferences extends Component
{
    state={
        edit : false
    }

    componentWillMount(){
        this.getUserDetails();
        console.log(this.props.userData);
    }

    getUserDetails = () => {
        console.log('hello');
        API.getUserDetails({email:this.props.userData.data.email})
        .then((res)=>{
            if (res.status === 201) {
                console.log("Success");
                console.log(res);
                res.json().then(user => {
                    console.log(user.userObj);
                    this.props.changeUserData(user.userObj);
                });
        
            } else if (res.status === 401) {
                console.log("Fail");
            }
        })
    }

    render(){
        var color = (this.state.edit)?'#ff690f':'#00bcd4';
        return(
            <div>
                <div className="row">
                    <span style={titlestyle}>
                        Preferences
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        First Name
                    </div>
                    <div className="col-md-9">
                        {!this.state.edit
                            ?<div>{this.props.userData.data.first_name?this.props.userData.data.first_name:'-'}</div>
                            :<input 
                                id="firstName"
                                type="text" 
                                name="FirstName" 
                                defaultValue={this.props.userData.data.first_name?this.props.userData.data.first_name:''}
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
                            ?<div>{this.props.userData.data.middle_name?this.props.userData.data.middle_name:'-'}</div>
                            :<input 
                                id="middleName"
                                type="text" 
                                name="MiddleName" 
                                defaultValue={this.props.userData.data.middle_name?this.props.userData.data.middle_name:''}
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
                            ?<div>{this.props.userData.data.last_name?this.props.userData.data.last_name:'-'}</div>
                            :<input 
                                id="lastName"
                                type="text" 
                                name="FirstName" 
                                defaultValue={this.props.userData.data.last_name?this.props.userData.data.last_name:''}
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
                            ?<div>{this.props.userData.data.address.street?this.props.userData.data.address.street:'-'}</div>
                            :<input 
                                id="street"
                                type="text" 
                                name="Street" 
                                defaultValue={this.props.userData.data.address.street?this.props.userData.data.address.street:''}
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
                            ?<div>{this.props.userData.data.address.city?this.props.userData.data.address.city:'-'}</div>
                            :<input 
                                id="city"
                                type="text" 
                                name="City" 
                                defaultValue={this.props.userData.data.address.city?this.props.userData.data.address.city:''}
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
                            ?<div>{this.props.userData.data.address.city?this.props.userData.data.address.city:'-'}</div>
                            :<select style={inputstyle} id="state" name="billing_state" class="r9-dropdown-select" title="State/Region"><option value={this.props.userData.data.address.state?this.props.userData.data.address.city:''} title="State/Region" class="all">State/Region</option><option value="AA">APO Americas</option><option value="AE">APO Europe</option><option value="AP">APO Pacific</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select>
                        }
                    </div>
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Postal Code
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{this.props.userData.data.address.zip_code?this.props.userData.data.address.zip_code:'-'}</div>
                            :<input 
                                id="postalcode"
                                type="text" 
                                name="postalcode" 
                                defaultValue={this.props.userData.data.address.zip_code?this.props.userData.data.address.zip_code:''}
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
                            ?<div>{this.props.userData.data.phone?this.props.userData.data.phone:'-'}</div>
                            :<input 
                                id="phone"
                                type="text" 
                                name="Phone" 
                                defaultValue={this.props.userData.data.phone?this.props.userData.data.phone:''}
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
                                email:      this.props.userData.data.email,
                                first_name: document.getElementById('firstName').value,
                                last_name:  document.getElementById('lastName').value,
                                middle_name:document.getElementById('middleName').value,
                                street:    document.getElementById('street').value,
                                city:       document.getElementById('city').value,
                                state:      document.getElementById('state').value,
                                postalcode: document.getElementById('postalcode').value,
                                country:    'USA',
                                phone:      document.getElementById('phone').value
                            }
                            if(!(data.postalcode.match(zipregex))){
                                NotificationManager.error("Invalid Zip code", "Zip error", 2500, true);
                            }
                            else{
                                console.log(data);
                                API.updateUserInfo(data)
                                .then((data)=>{
                                    if(data.status===201)
                                    {
                                        console.log("info changed");
                                        this.getUserDetails();
                                        this.setState({edit:false});
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
                <div className="row" style={{marginTop:'20px'}}>
                <FlatButton primary={true} backgroundColor="white" hoverColor="white" onClick={()=>{
                    API.deleteAccount()
                    .then((data)=>{
                        if(data.status===201){
                            console.log('user deleted successfully');
                        }
                        else{
                            console.log('error');
                        }
                    });
                }}>Delete Account</FlatButton>
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
        userData:state.userData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeUserData,
        }
    ,dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Preferences);