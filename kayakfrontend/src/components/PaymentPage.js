import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import * as API from '../api/API';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeBillingData} from '../actions/billingDataAction.js';

import ReactStars from 'react-stars';

import visa from '../icons/Visa-icon.png'
import master from '../icons/Master-Card-icon.png';
import american from '../icons/American-Express-icon.png';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const zipregex = /(^\d{5}$)|(^\d{5}-\d{4}$)/ ;

const masterCardReg = "^5";
const visaCardReg = "^4";
const americanCardReg = "^3";
var defaultCardVal=false;
class PaymentPage extends Component
{
    constructor(props){
        super(props);

        if(this.props.userData.billing.carddetails.credit_card_number){
            var defaultVal= this.props.userData.billing.carddetails.credit_card_number+"";
            if(defaultVal.match(masterCardReg)){
                defaultCardVal = master;
            }
            else if(defaultVal.match(visaCardReg)){
                defaultCardVal = visa;
            }
            else if(defaultVal.match(americanCardReg)){
                defaultCardVal = american;
            }
            
        }
        
        this.state = {
            edit : false,
            defaultCard : defaultCardVal,
            card: defaultCardVal
        }
    }

    componentWillMount(){
        this.getBillingDetails();
    }
    handleChange = (event) =>{
        var val= event.target.value;
        if(val.match(masterCardReg)){
            this.setState({...this.state,card:master,defaultCard:master})
        }
        else if(val.match(visaCardReg)){
            this.setState({...this.state,card:visa,defaultCard:visa})
        }
        else if(val.match(americanCardReg)){
            this.setState({...this.state,card:american,defaultCard:american})
        }
        else{
            this.setState({...this.state,card:false})
        }
    
    }
    

    getBillingDetails = () => {
        console.log('hello');
        API.getBillingDetails({email:this.props.userData.data.email})
        .then((res)=>{
            if (res.status === 201) {
                console.log("Success");
                console.log(res);
                res.json().then(user => {
                    console.log(user.cardObj);
                    if(!user.cardObj.carddetails.credit_card_number)
                    {
                        console.log('emptyyyy');
                    }
                    this.props.changeBillingData(user.cardObj);
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
                        Payment Methods
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={cbstyle}>
                    Credit and Debit Cards
                </div>
                <div className="row" style={bstyle}>
                    Billing Information
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Name on Card
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{(this.props.userData.billing.carddetails.card_name)?this.props.userData.billing.carddetails.card_name:''}</div>
                            :
                            <div>
                                
                                    <input 
                                        id="name_on_card"
                                        type="text" 
                                        name="name_on_card" 
                                        defaultValue={(this.props.userData.billing.carddetails.card_name)?this.props.userData.billing.carddetails.card_name:''}
                                        placeholder="Name on Card"
                                        
                                        style={inputstyle}
                                    />

                            </div>
                        }
                    </div>
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={{fontWeight:'bold',color: '#333',fontSize:'14px',marginTop:"10px"}}>
                        Card Number
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{(this.props.userData.billing.carddetails.credit_card_number)?
                                <div className="row">
                                    <div className="col-md-2" style={{marginTop:"10px"}}>
                                        {this.props.userData.billing.carddetails.credit_card_number}
                                    </div>
                                    <div className="col-md-2">
                                        {
                                            this.state.defaultCard && 
                                                <img src={this.state.defaultCard} style={{width:"40px",height:"40px"}} className="img-responsive" alt="logo"/>
                                        }
                                    </div>
                                </div>    
                                :''}</div>
                            :
                            <div className="row">
                                <div className="col-md-5">
                            
                                    <input 
                                        id="cnumber"
                                        type="text" 
                                        name="cnumber" 
                                        defaultValue={(this.props.userData.billing.carddetails.credit_card_number)?this.props.userData.billing.carddetails.credit_card_number:''}
                                        placeholder="Credit Card Number"
                                        onChange={(event)=> this.handleChange(event)} 
                                        style={inputstyle}
                                    />
                                </div>
                                <div className="col-md-2">
                                    {
                                        this.state.card && 
                                            <img src={this.state.card} style={{width:"40px",height:"40px"}} className="img-responsive" alt="logo"/>
                                    }
                                </div>
                            </div>
                                
                        }
                    </div>
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Expiry Date
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>
                            {this.props.userData.billing.carddetails.expiry_month?this.props.userData.billing.carddetails.expiry_month:''}
                            -{this.props.userData.billing.carddetails.expiry_year?this.props.userData.billing.carddetails.expiry_year:''}
                            </div>
                            :<div>
                                <select id="expDateMonth" defaultValue={this.props.userData.billing.carddetails.expiry_month?this.props.userData.billing.carddetails.expiry_month:''} style={datestyle} name="expDateMonth" class="r9-dropdown-select" title="(01) Jan">
                                    <option value="01" title="(01) Jan">(01) Jan</option>
                                    <option value="02" title="(02) Feb">(02) Feb</option>
                                    <option value="03" title="(03) Mar">(03) Mar</option>
                                    <option value="04" title="(04) Apr">(04) Apr</option>
                                    <option value="05" title="(05) May">(05) May</option>
                                    <option value="06" title="(06) Jun">(06) Jun</option>
                                    <option value="07" title="(07) Jul">(07) Jul</option>
                                    <option value="08" title="(08) Aug">(08) Aug</option>
                                    <option value="09" title="(09) Sep">(09) Sep</option>
                                    <option value="10" title="(10) Oct">(10) Oct</option>
                                    <option value="11" title="(11) Nov">(11) Nov</option>
                                    <option value="12" title="(12) Dec">(12) Dec</option>
                                </select>
                                <select id="expDateYear" defaultValue={this.props.userData.billing.carddetails.expiry_year?this.props.userData.billing.carddetails.expiry_year:''} style={datestyle} name="expDateYear" class="r9-dropdown-select" title="2018">
                                    <option value="2017" title="2017">2017</option>
                                    <option value="2018" title="2018" selected="selected">2018</option>
                                    <option value="2019" title="2019">2019</option>
                                    <option value="2020" title="2020">2020</option>
                                    <option value="2021" title="2021">2021</option>
                                    <option value="2022" title="2022">2022</option>
                                    <option value="2023" title="2023">2023</option>
                                    <option value="2024" title="2024">2024</option>
                                    <option value="2025" title="2025">2025</option>
                                    <option value="2026" title="2026">2026</option>
                                    <option value="2027" title="2027">2027</option>
                                </select>
                            </div>
                        }
                    </div>
                </div>
                <div className="row" style={bstyle}>
                    Billing Address
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Street
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{this.props.userData.billing.carddetails.street?this.props.userData.billing.carddetails.street:''}</div>
                            :<input 
                                id="street"
                                type="text" 
                                name="Street" 
                                defaultValue={this.props.userData.billing.carddetails.street?this.props.userData.billing.carddetails.street:''}
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
                            ?<div>{this.props.userData.billing.carddetails.city?this.props.userData.billing.carddetails.city:''}</div>
                            :<input 
                                id="city"
                                type="text" 
                                name="City" 
                                defaultValue={this.props.userData.billing.carddetails.city?this.props.userData.billing.carddetails.city:''}
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
                            ?<div>{this.props.userData.billing.carddetails.state?this.props.userData.billing.carddetails.state:''}</div>
                            :<select id="state" defaultValue={this.props.userData.billing.carddetails.state?this.props.userData.billing.carddetails.state:''} style={inputstyle} name="billing_state" class="r9-dropdown-select" title="State/Region"><option value="" title="State/Region" class="all">State/Region</option><option value="AA">APO Americas</option><option value="AE">APO Europe</option><option value="AP">APO Pacific</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select>
                        }
                    </div>
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Postal Code
                    </div>
                    <div className="col-md-9">
                    {!this.state.edit
                            ?<div>{this.props.userData.billing.carddetails.zip_code?this.props.userData.billing.carddetails.zip_code:''}</div>
                            :<input 
                                id="postalcode"
                                type="text" 
                                name="postalcode" 
                                defaultValue={this.props.userData.billing.carddetails.zip_code?this.props.userData.billing.carddetails.zip_code:''}
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
                <div className="row">
                    <RaisedButton backgroundColor={color} onClick={()=>{
                        console.log("hello"+this.state.edit);
                        if(!this.state.edit){
                            this.setState({...this.state,edit : true});
                        }
                        else{
                            var data = {
                                email:          this.props.userData.data.email,        
                                card_name:   document.getElementById('name_on_card').value, 
                                credit_card_number:        document.getElementById('cnumber').value,
                                expiry_month:   document.getElementById('expDateMonth').value,
                                expiry_year:    document.getElementById('expDateYear').value,
                                street:         document.getElementById('street').value,
                                city:           document.getElementById('city').value,
                                zip_code:     document.getElementById('postalcode').value,
                                country:        'USA',
                                state:          document.getElementById('state').value,
                            }
                            console.log(data);
                            const zip = data.zip_code;
                            if(!(zip.match(zipregex))){
                                NotificationManager.error("Invalid Zip code", "Zip error", 2500, true);
                            }
                            else{
                                API.updateUserBilling(data)
                                .then((data)=>{
                                    if(data.status===201)
                                    {
                                        console.log("info changed");
                                        this.setState({edit:false});
                                        this.getBillingDetails();
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

const cbstyle={
    marginTop:'8px',
    fontWeight:'bold',
    fontSize:'16px',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    textAlign:'left'
}
const bstyle={
    fontSize:'16px',
    fontWeight:'400px',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    marginTop:'23px',
    marginBottom:'23px'
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
const inputstyle={
    width: '296px',
    height: '32px'
}

const datestyle={
    width:'138px',
    height: '32px',
    marginRight: '20px'
}
function mapStateToProps(state){
    return{
        userData:state.userData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeBillingData,
        }
    ,dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(PaymentPage);