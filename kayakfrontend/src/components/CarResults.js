import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import IconSort from '../icons/IconSort';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import * as API from '../api/API';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {withRouter} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import {loginModalOpen} from '../actions/loginModalAction';
import {signupModalOpen} from '../actions/signupModalAction';

import {changeCarListing} from '../actions/carListingAction';
import {changeCarSearch} from '../actions/carSearchAction';
import {changeBooking} from '../actions/bookingAction';

import img1 from '../images/price-alert_ad_white.png';
import img3 from '../images/explore_ad_white.png';
import img2 from '../images/kayak-app_ad_v1.jpg';
import person from '../images/person.svg';
import bag from '../images/bag.svg';
import door from '../images/door.svg';

import img4 from '../images/car1.png';

import AutoComplete from 'material-ui/AutoComplete';
import cities from '../data/cities';

var R,S;
class CarResults extends Component
{
    state = {
        sort:0,
        Small:true,
        Medium:true,
        Large:true,
        SUV:true,
        Luxury:true,
        PickupTruck:true,
        Van:true,
        Commercial:true,
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
            activity: this.props.userData.carSearch.city +" Car Search",
            timeSpent: R-S,
            timenow: Date.now(),
            type:"Car Results"
        }})
    }

    componentDidMount(){
        this.getCars();
    }
    getCars = () => {
        var type = [];
        if(this.state.Small){type.push('Small');}
        if(this.state.Medium){type.push('Medium');}
        if(this.state.Large){type.push('Large');}
        if(this.state.Luxury){type.push('Luxury');}
        if(this.state.SUV){type.push('SUV');}
        if(this.state.PickupTruck){type.push('PickupTruck');}
        if(this.state.Van){type.push('Van');}
        if(this.state.Commercial){type.push('Commercial');}
        var data ={
            city:     document.getElementById('city').value,
            toDate:     document.getElementById('toDate').value,
            fromDate:   document.getElementById('fromDate').value,
            pickuptime: '',
            dropofftime: '',
            order:this.state.sort?'price_desc':'price_asc',
            filter_prop :{type:type}
        }
        if(data.city && data.toDate && data.fromDate && (new Date(data.toDate)-new Date(data.fromDate)>0) && (new Date(data.fromDate) > new Date())){
            //console.log(data);
            this.props.changeCarSearch(data);
            API.doCarSearch(data)
            .then((res)=>{
                if(res.status===201){
                    res.json().then(items=>{
                        //console.log(items.data);
                        this.props.changeCarListing(items.data);    
                    });
                }
            });
        }
        else{
            NotificationManager.warning('Enter Valid Details','Search Fields are Invalid',2500);
        }
    }

    showCars = () => {
        if(this.props.userData.cars !== undefined)
        {
            const cars=this.props.userData.cars;
            console.log(cars);
            return cars.map(car=>(
                <div style={carstyle}>
                    <div className="col-md-6" style={{padding:'0px',marginTop:'10px'}}>
                        <div className="row" style={{fontSize:'20px',fontWeight:'400'}}>
                            {(car.car.car_type==='Small' || car.car.car_type==='Medium') && 'Compact'}
                            {(car.car.car_type==='Large' || car.car.car_type==='SUV') && 'Economy'}
                            {(car.car.car_type==='Pickup Truck' || car.car.car_type==='Commercial') && 'Commercial'}
                            {(car.car.car_type==='Luxury') && 'Luxury'}
                            {(car.car.car_type==='Van') && 'Van'}
                        </div>
                        <div className="row" style={{fontSize:'15px', fontWeight:'900',marginTop:'20px'}}>
                            {car.car.car_name}
                        </div>
                        <div className="row" style={{fontSize:'13px', fontWeight:'500',marginTop:'20px'}}>
                            {car.car.model_name}
                        </div>
                        <div className="row" style={{}}>
                        <span style={{width:'100%',height:'1px',display:'inline-block',background:'#e4e5ea',position:'relative',margin:'3px 0'}} />
                        </div>
                        <div className="row" style={{fontWeight:'900',marginTop:'10px'}}>
                            <div className="col-md-2">
                                <img src={person}/>
                            </div>
                            <div className="col-md-2">
                                6
                            </div>
                            <div className="col-md-2">
                                <img src={bag}/>
                            </div>
                            <div className="col-md-2">
                                2
                            </div>
                            <div className="col-md-2">
                                <img src={door}/>
                            </div>
                            <div className="col-md-2">
                                4
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row" style={{float:'right',padding:'5px',backgroundColor:'#8b8b8e',marginTop:'7px',color:'white',borderRadius:'4px',textAlign:'center',fontSize:'11px'}}>
                            GREAT DEAL
                        </div>
                        <div className="row">
                            <img src={img4} style={{width:'150px',marginTop:'20px'}}/>
                        </div>
                    </div>
                    <div className="col-md-3" style={{borderLeft:'100px',borderLeftColor:'#ebebed',height:'100%',textAlign:'center'}}>
                        <div className="row" style={{fontSize:'25px',fontWeight:'500',marginTop:'50px'}}>
                            {'$'+car.car.car_rental_price}
                        </div>
                        <div className="row" style={{marginTop:'20px'}}>
                            <button style={btnstyle1} backgroundColor="#ff690f" labelColor='white'
                            onClick={()=>{
                                if((!this.props.userData.loggedIn)){
                                    this.props.loginModalOpen();
                                }
                                else{
                                    var data = {
                                        bookingType: 'Car',
                                        car: car.car,
                                        carid: car._id,
                                        search: this.props.userData.carSearch,
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
    render(){
        return(
            <div>
                <div className="row" style={rstyle}>

                    <div className="col-md-5" >
                        <div className="row" style={divstyle}>
                            {this.props.loginModal.isOpen && <LoginModal/>}
                            {this.props.signupModal.isOpen && <SignupModal/>}
                            <TextField style={istyle}
                            id="city"
                            defaultValue={this.props.userData.carSearch.city}
                            hintText={this.props.userData.carSearch.city}
                            dataSource={this.state.dataSource}
                            filter={AutoComplete.caseInsensitiveFilter}
                            maxSearchResults	= {5}
                            fullWidth={true}
                            underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                            underlineFocusStyle={{"borderColor":"#ec7132"}}
                            
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row" style={divstyle}>
                            <DatePicker 
                            underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                            underlineFocusStyle={{"borderColor":"#ec7132"}}
                            id="fromDate" defaultDate={new Date(this.props.userData.carSearch.fromDate+"T08:00:00Z")} style={istyle} hintText="From" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row" style={divstyle}>
                            <DatePicker 
                            underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                            underlineFocusStyle={{"borderColor":"#ec7132"}}
                            id="toDate" defaultDate={new Date(this.props.userData.carSearch.toDate+"T08:00:00Z")} style={istyle} hintText="To" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row" style={divstyle}>
                            <button style={btnstyle}
                                id="destbtn"
                                hintText="Where"
                                onClick={()=>{
                                    this.getCars();
                                }}
                            >
                            <IconArrow color="white" style={arrowStyle}/> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row" style={{backgroundColor:'#eaebee',minHeight:'100vh',width:'100%',margin:'0px',paddingBottom:'50px'}}>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',backgroundColor:'white'}}>
                                <div class="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'price'});
                                        this.getCars();
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
                                <div class="row" style={starttitle} >
                                    <span style={{float:'left'}}>Car Type</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,Small:true,
                                            Medium:true,
                                            Large:true,
                                            SUV:true,
                                            Luxury:true,
                                            PickupTruck:true,
                                            Van:true,
                                            Commercial:true,});
                                        this.getCars();
                                    }}>RESET</span>
                                </div>
                                <div class="row" >
                                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'83%',marginTop:'0px',marginLeft:'15px'}}/>
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Small"
                                        checked={this.state.Small}
                                        onCheck={()=>{this.setState({...this.state,Small:!this.state.Small});this.getCars();}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Medium"
                                        checked={this.state.Medium}
                                        onCheck={()=>{this.setState({...this.state,Medium:!this.state.Medium});this.getCars();}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Large"
                                        checked={this.state.Large}
                                        onCheck={()=>{this.setState({...this.state,Large:!this.state.Large});this.getCars();}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="SUV"
                                        checked={this.state.SUV}
                                        onCheck={()=>{this.setState({...this.state,SUV:!this.state.SUV});this.getCars();}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Luxury"
                                        checked={this.state.Luxury}
                                        onCheck={()=>{this.setState({...this.state,Luxury:!this.state.Luxury});this.getCars();}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Pickup Truck"
                                        checked={this.state.PickupTruck}
                                        onCheck={()=>{this.setState({...this.state,PickupTruck:!this.state.PickupTruck});this.getCars();}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Van"
                                        checked={this.state.Van}
                                        onCheck={()=>{this.setState({...this.state,Van:!this.state.Van});this.getCars();}}
                                    />
                                </div>
                                <div className="row" style={{fontSize:'13.5px',fontWeight:'100',marginLeft:'0px'}}>
                                    <Checkbox
                                        label="Commercial"
                                        checked={this.state.Commercial}
                                        onCheck={()=>{this.setState({...this.state,Commercial:!this.state.Commercial});this.getCars();}}
                                    />
                                </div>
                            </div>
                        </div>                       
                    </div>
                    <div className="col-md-7">
                        <div class="row">
                            <div className="col-md-12" style={{margin:'10px',marginLeft:'20px'}}>
                                {this.showCars()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div class="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img1} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                        <div class="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img2} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                        <div class="row">
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

const carstyle={
    marginBottom:'10px',
    backgroundColor:'#ffffff',
    height:'190px',
    width:'100%',
    padding:'10px 25px'
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
const arrowStyle={
    marginLeft:'-5px'
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
            changeCarListing,
            changeCarSearch,
            changeBooking,
            loginModalOpen,
            signupModalOpen
        }
        ,dispatch);
  }

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(CarResults));