import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import IconSort from '../icons/IconSort';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as API from '../api/API';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {withRouter} from 'react-router-dom';

import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import {loginModalOpen} from '../actions/loginModalAction';
import {signupModalOpen} from '../actions/signupModalAction';


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeFlightListing} from '../actions/flightListingAction';
import {changeFlightSearch} from '../actions/flightSearchAction';
import {changeBooking} from '../actions/bookingAction';

import img1 from '../images/price-alert_ad_white.png';
import img2 from '../images/explore_ad_v1.jpg';
import img3 from '../images/explore_ad_white.png';

import AA from '../images/DL.png';

import AutoComplete from 'material-ui/AutoComplete';
import cities from '../data/cities';
var R,S;
class FlightResults extends Component
{
    state = {
        valueClass: this.props.userData.flightSearch.class,
        valueTraveler: this.props.userData.flightSearch.no_of_traveler,
        sort:0,
        type:'arrival',
        dataSource:cities.names
    }

    componentWillMount(){
        console.log(Date.now());
        S=Date.now();
    }

    componentWillUnmount(){
        R=Date.now();
        console.log(R-S);
        API.saveRecord({record:{userid: this.props.userData.data._id,
            activity: this.props.userData.flightSearch.origin + "-" + this.props.userData.flightSearch.destination +" Flight Search",
            timeSpent: R-S,
            timenow: Date.now(),
            type:"Flight Results"
        }})
    }

    componentDidMount(){
        //this.getFlights();
    }

    getFlights = () =>{
        var order = this.state.type+(this.state.sort?'_desc':'_asc');
        var data ={
            origin:     document.getElementById('source').value,
            destination:document.getElementById('destination').value,
            //arrival_date:     document.getElementById('toDate').value,
            departure_date:   document.getElementById('fromDate').value,
            class:      this.state.valueClass,
            no_of_traveler:this.state.valueTraveler,
            order,
            filter_prop:{
                stops: [],
                flight_name: []
            }
        }
        console.log(data);
        if(data.origin && data.destination && !(data.origin===data.destination) && data.departure_date && (new Date(data.departure_date) > new Date())){
            console.log(data);
            this.props.changeFlightSearch(data);
            API.doFlightSearch(data)
            .then((res)=>{
                if(res.status===201){
                    res.json().then(items=>{
                        console.log(items.data);
                        this.props.changeFlightListing(items.data);
                    });
                }
            });
        }
        else{
            NotificationManager.warning('Enter Valid Details','Search Fields are Invalid',2500);
        }
    }

    showFlights = () => {
        if(this.props.userData.flights !== undefined)
        {
            const flights=this.props.userData.flights;
            console.log(flights);
            return flights.map(flight=>(
                <div style={flightstyle}>
                    <div className="col-md-9" style={{padding:'0px'}}>
                        <div className="row">
                            <div className="col-md-2 col-md-offset-1">
                                <div className="row" style={{marginTop:'30px',marginLeft:'10px'}}>
                                    <img src={AA} style={{width:'32px'}}/>
                                </div>
                                <div className="row" style={{marginTop:'20px'}}>
                                    {flight.flight.flight_operator_name}
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="row" style={{marginTop:'40px'}}>
                                    {flight.flight.departure_date.slice(11,16)}
                                </div>
                                <div className="row">
                                    {flight.flight.origin}
                                </div>
                            </div>
                            <div className="col-md-2">
                            <div className="row" style={{marginTop:'40px'}}>
                                    <span style={{width:'100%',height:'2px',display:'inline-block',background:'#717585',position:'relative',margin:'3px 0'}} />
                                </div>
                                <div className="row" style={{textAlign:'center'}}>
                                    {'nonstop'}
                                </div>  
                            </div>
                            <div className="col-md-2 col-md-offset-1">
                                <div className="row" style={{marginTop:'40px'}}>
                                    {flight.flight.arrival_date.slice(11,16)}  
                                </div>
                                <div className="row" >
                                    {flight.flight.destination}
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="row" style={{marginTop:'50px'}}>
                                    {'21h 50m'}
                                    {flight.flight.duration}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3" style={{borderLeft:'100px',borderLeftColor:'#ebebed',height:'100%',textAlign:'center'}}>
                        <div className="row" style={{fontSize:'25px',fontWeight:'500',marginTop:'20px'}}>
                            {(this.state.valueClass==='Economy') && '$'+flight.flight.classes[1].class_price}
                            {(this.state.valueClass==='Business') && '$'+flight.flight.classes[0].class_price}
                            {(this.state.valueClass==='First Class') && '$'+flight.flight.classes[2].class_price}
                        </div>
                        <div className="row" style={{marginTop:'20px'}}>
                            <button style={btnstyle1} backgroundColor="#ff690f" labelColor='white'
                            onClick={()=>{
                                if((!this.props.userData.loggedIn)){
                                    this.props.loginModalOpen();
                                }
                                else{
                                    var data = {
                                        bookingType: 'Flight',
                                        flight: flight.flight,
                                        flightid: flight._id,
                                        class: this.state.valueClass,
                                        search: this.props.userData.flightSearch,
                                    }
                                    console.log(data);
                                    this.props.changeBooking(data);
                                    this.props.history.push('/booking');
                                }
                                
                            }}
                            >Book Now</button>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    handleChangeClass = (event, index, valueClass) => this.setState({...this.state,valueClass});
    handleChangeTraveler = (event, index, valueTraveler) => this.setState({...this.state,valueTraveler});

    render(){
        
        return(
            <div>
                <div className="row" style={rstyle}>
                    {this.props.loginModal.isOpen && <LoginModal/>}
                    {this.props.signupModal.isOpen && <SignupModal/>}
                    <div className="col-md-2" >
                        <div className="row" style={divstyle}>
                            
                            <TextField style={istyle}
                                id="source"
                                defaultValue={this.props.userData.flightSearch.origin}
                                hintText={this.props.userData.flightSearch.origin}
                                dataSource={this.state.dataSource}
                                onUpdateInput={this.handleDestChange}
                                filter={AutoComplete.caseInsensitiveFilter}
                                maxSearchResults	= {5}
                                fullWidth={true}
                                underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                underlineFocusStyle={{"borderColor":"#ec7132"}}
                            />
                        </div>
                    </div>
                    <div className="col-md-2" >
                        <div className="row" style={divstyle}>
                            <TextField style={istyle}
                                id="destination"
                                defaultValue={this.props.userData.flightSearch.destination}
                                hintText={this.props.userData.flightSearch.destination}
                                dataSource={this.state.dataSource}
                                onUpdateInput={this.handleDestChange}
                                filter={AutoComplete.caseInsensitiveFilter}
                                maxSearchResults	= {5}
                                fullWidth={true}
                                underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                underlineFocusStyle={{"borderColor":"#ec7132"}}
                            />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="row" style={divstyle}>
                                    <DatePicker 
                                    underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                    underlineFocusStyle={{"borderColor":"#ec7132"}}
                                    id="fromDate" defaultDate={new Date(this.props.userData.flightSearch.departure_date+"T08:00:00Z")} style={istyle} hintText="From" container="inline" autoOk/>
                                </div>
                            </div>
                            {/* <div className="col-md-3">
                                <div className="row" style={divstyle}>
                                    <DatePicker 
                                    underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                    underlineFocusStyle={{"borderColor":"#ec7132"}}
                                    id="toDate" defaultDate={new Date(this.props.userData.flightSearch.arrival_date+"T08:00:00Z")} style={istyle} hintText="To" container="inline" autoOk/>
                                </div>
                            </div> */}
                            <div className="col-md-4">
                                <div className="row" style={divstyle}>
                                    <SelectField
                                        value={this.state.valueClass}
                                        onChange={this.handleChangeClass}
                                        underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                        underlineFocusStyle={{"borderColor":"#ec7132"}}
                                        style={istyle}
                                        >
                                        <MenuItem value={'Economy'} primaryText="Economy" />
                                        <MenuItem value={'Business'} primaryText="Business" />
                                        <MenuItem value={'First Class'} primaryText="First Class" />
                                    </SelectField>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="row" style={divstyle}>
                                    <SelectField
                                        value={this.state.valueTraveler}
                                        onChange={this.handleChangeTraveler}
                                        underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                        underlineFocusStyle={{"borderColor":"#ec7132"}}
                                        style={istyle}
                                        >
                                        <MenuItem value={1} primaryText="1 traveler" />
                                        <MenuItem value={2} primaryText="2 travelers" />
                                        <MenuItem value={3} primaryText="3 travelers" />
                                        <MenuItem value={4} primaryText="4 travelers" />
                                        <MenuItem value={5} primaryText="5 travelers" />
                                        <MenuItem value={6} primaryText="6 travelers" />
                                        <MenuItem value={7} primaryText="7 travelers" />
                                        <MenuItem value={8} primaryText="8 travelers" />
                                        <MenuItem value={9} primaryText="9 travelers" />
                                        <MenuItem value={10} primaryText="10 travelers" />
                                    </SelectField>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row" style={divstyle}>
                            <button style={btnstyle}
                                id="destbtn"
                                hintText="Where"
                                onClick={()=>{
                                    this.getFlights();      
                                }}
                            >
                            <IconArrow color="white"/> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row" style={{backgroundColor:'#eaebee',minHeight:'100vh',width:'100%',margin:'0px',paddingBottom:'50px'}}>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',backgroundColor:'white'}}>
                                <div className="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'price'});
                                        this.getFlights();
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px',color:(this.state.type==='price')?'#80abec':'black'}}>PRICE</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" >
                                    {(this.state.type==='price') &&
                                    <IconSort width="24" height="24" color="#80abec" sort={this.state.sort}/>
                                    }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginTop:'0px',backgroundColor:'white'}}>
                                <div className="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'arrival'});
                                        this.getFlights();
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px',color:(this.state.type==='arrival')?'#80abec':'black'}}>ARRIVAL</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white">
                                    {(this.state.type==='arrival') &&
                                    <IconSort width="24" height="24" color="#80abec" sort={this.state.sort}/>
                                    }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginTop:'0px',backgroundColor:'white'}}>
                                <div className="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'departure'});
                                        this.getFlights();
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px',color:(this.state.type==='departure')?'#80abec':'black'}}>DEPARTURE</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white">
                                    {(this.state.type==='departure') &&
                                    <IconSort width="24" height="24" color="#80abec" sort={this.state.sort}/>
                                    }
                                    </span>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginLeft:'20px'}}>
                                {this.showFlights()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img1} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img2} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img3} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const btnstyle1={
    border:'none',
    fontSize:'16px',
    height:'30px',
    width:'70%',
    marginLeft:'5px',
    marginRight:'5px',
    color:'white',
    backgroundImage: 'linear-gradient(135deg,#ff690f 0%,#ff4f3a 100%)',
}

const flightstyle={
    marginBottom:'10px',
    backgroundColor:'#ffffff',
    height:'130px',
    width:'100%',
}

const starttitle={
    margin:'10px',
    color:'#0f0f0f',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight:'600',
    fontSize:'1.2em',
    cursor:'pointer',
    marginLeft:'0px'
}

const rstyle={
    marginTop:'19px',
    marginRight:'15px',
    marginLeft:'15px',
    height:'71px',
    width:'100%'
}
const btnstyle={
    border:'none',
    fontSize:'16px',
    height:'50px',
    width:'60%',
    marginLeft:'5px',
    marginRight:'5px',
    backgroundImage: 'linear-gradient(135deg,#ff690f 0%,#ff4f3a 100%)',
    boxShadow:'5px 5px 5px 1px #eaebee'
}
const istyle={
    fontSize:'16px',
    fontWeight:'600',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginLeft:'5px',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    textAlign:'center',
    boxShadow:'5px 5px 5px 1px #eaebee'
}
const divstyle={
    marginLeft:'-20px',
    marginRight:'-2px',
}

function mapStateToProps(state){
    return{
        userData:state.userData,
        loginModal:state.loginModal,
        signupModal:state.signupModal
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeFlightListing,
            changeFlightSearch,
            changeBooking,
            loginModalOpen,
            signupModalOpen
        }
    ,dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(FlightResults));