import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import IconStar from '../icons/IconStar';
import IconStarOut from '../icons/IconStarOut';
import IconSort from '../icons/IconSort';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {withRouter} from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';

import * as API from '../api/API';

import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import {loginModalOpen} from '../actions/loginModalAction';
import {signupModalOpen} from '../actions/signupModalAction';

import img1 from '../images/price-alert_ad_white.png';
import img2 from '../images/price-alert_ad_v1.jpg';
import img3 from '../images/explore_ad_white.png';

import img4 from '../images/hotel1.jpg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeHotelListing} from '../actions/hotelListingAction';
import {changeHotelSearch} from '../actions/hotelSearchAction';
import {changeBooking} from '../actions/bookingAction';

import ReactStars from 'react-stars';

import AutoComplete from 'material-ui/AutoComplete';
import cities from '../data/cities';
var R,S;
class HotelResults extends Component
{
    componentWillMount(){
        console.log(Date.now());
        S=Date.now();
    }

    componentWillUnmount(){
        R=Date.now();
        console.log(R-S);
        API.saveRecord({record:{userid: this.props.userData.data._id,
            activity: this.props.userData.hotelSearch.city +" Hotel Search",
            timeSpent: R-S,
            timenow: Date.now(),
            type:"Hotel Search"
        }})
    }
    
    state = {
        valueRoom:this.props.userData.hotelSearch.noOfRoom,
        valueGuest:this.props.userData.hotelSearch.noOfGuest,
        valueStar:0,
        sort:0,
        roomType:'Standard',
        dataSource:cities.names
    }

    componentDidMount(){
        this.getHotels();
    }

    getHotels = () =>{
        console.log("hello");
        var filter_props = {
            ratings: this.state.valueStar,
        }
        var data ={
            city:       document.getElementById('destination').value,
            checkIn:    document.getElementById('fromDate').value,
            checkOut:   document.getElementById('toDate').value,
            noOfRoom:   this.props.userData.hotelSearch.noOfRoom,
            noOfGuest:  this.props.userData.hotelSearch.noOfGuest,
            filter_prop:{ratings: this.state.valueStar},
            order:      this.state.sort?'price_desc':'price_asc',
        }
        console.log(data);
        if(data.city && data.checkIn && data.checkOut && (new Date(data.checkOut)-new Date(data.checkIn)>0) && (new Date(data.checkIn) > new Date())){
            //console.log(data);
            this.props.changeHotelSearch(data);
            API.doHotelSearch(data)
            .then((res)=>{
                if(res.status===201){
                    res.json().then(items=>{
                        console.log(items.data);
                        this.props.changeHotelListing(items.data);
                    });
                }
            });
        }
        else{
            NotificationManager.warning('Enter Valid Details','Search Fields are Invalid',2500);
        }
    }

    handleChangeRoomType = (event, index, roomType) => {
        this.setState({...this.state,roomType:roomType});
    }
    showHotels = () => {
        if(this.props.userData.hotels !== undefined)
        {
            const hotels=this.props.userData.hotels;
            console.log(hotels);
            return hotels.map(hotel=>(
                <div style={hotelstyle}>
                    <div className="col-md-4" style={{padding:'0px'}}>
                        <img src={img4}/>
                    </div>
                    <div className="col-md-8">
                        <div className="row" style={{padding:'10px',height:'100%'}}>
                            <div className="col-md-8">
                                <div className="row" style={{fontSize:'19px',color:'#0f0f0f',lineHeight:'22px',fontWeight:'500px'}}>
                                    {hotel.hotel.hotel_name.toUpperCase()}
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ReactStars
                                            count={7}
                                            size={20}
                                            color2={'#212121'} 
                                            value={hotel.hotel.stars}
                                            edit={false}
                                        />
                                    </div>
                                    {(hotel.hotel.stars>=5) && <div className="col-md-5" style={{backgroundColor:'#8b8b8e',marginTop:'7px',color:'white',borderRadius:'4px',textAlign:'center',fontSize:'11px'}}>
                                        Top Luxury Hotel
                                    </div>}
                                </div>
                                <div className="row" style={{marginTop:'30px'}}>
                                    <div className="col-md-2" style={{width:'50px',height:'40px',backgroundColor:'#558fe6',color:'white',fontSize:'15px',borderRadius:'5px',lineHeight:'40px'}}>
                                        {'8.4'}
                                    </div>
                                    <div className="col-md-6">
                                        {'Excellent'}
                                        <br/>
                                        {'1000 reviews'}
                                    </div>
                                </div>
                                <div className="row" style={{marginTop:'20px',marginLeft:'0px'}}>
                                    {hotel.hotel.address.street}
                                    <br></br>
                                    {hotel.hotel.address.city}
                                </div>
                            </div>
                            <div className="col-md-4" style={{borderLeft:'100px',borderLeftColor:'#ebebed',height:'100%',textAlign:'center'}}>
                                <div className="row" style={{fontSize:'25px',fontWeight:'500',marginTop:'30px'}}>
                                    {(this.state.roomType==='Standard') && '$'+hotel.hotel.rooms[0].room_price}
                                    {(this.state.roomType==='Suite') && '$'+hotel.hotel.rooms[1].room_price}
                                    {(this.state.roomType==='Delux') && '$'+hotel.hotel.rooms[2].room_price}
                                </div>
                                <div className="row" style={{marginTop:'20px'}}>
                                    <button style={btnstyle1} labelColor='white'
                                    onClick={()=>{

                                        if((!this.props.userData.loggedIn)){
                                            this.props.loginModalOpen();
                                        }
                                        else{
                                            var data = {
                                                bookingType: 'Hotel',
                                                hotel: hotel.hotel,
                                                hotelid: hotel._id,
                                                city:       document.getElementById('destination').value,
                                                checkIn:    document.getElementById('fromDate').value,
                                                checkOut:   document.getElementById('toDate').value,
                                                noOfRoom:   this.state.valueRoom,
                                                noOfGuest:  this.state.valueGuest,
                                                roomType: this.state.roomType
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
                    </div>
                </div>
            ))
        }
    }

    handleChangeRoom = (event, index, valueRoom) => this.setState({...this.state,valueRoom:valueRoom});
    handleChangeGuest = (event, index, valueGuest) => this.setState({...this.state,valueGuest:valueGuest});

    render(){
        return(
            <div>
                <div className="row" style={rstyle}>
                    {this.props.loginModal.isOpen && <LoginModal/>}
                    {this.props.signupModal.isOpen && <SignupModal/>}
                    <div className="col-md-3" >
                        <div className="row" style={divstyle}>
                            
                            <TextField style={istyle}
                                defaultValue={this.props.userData.hotelSearch.city}
                                id="destination"
                                hintText={this.props.userData.hotelSearch.city}
                                dataSource={this.state.dataSource}
                                filter={AutoComplete.caseInsensitiveFilter}
                                maxSearchResults	= {5}
                                underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                underlineFocusStyle={{"borderColor":"#ec7132"}}
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <DatePicker 
                            underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                            underlineFocusStyle={{"borderColor":"#ec7132"}}
                            id="fromDate" defaultDate={new Date(this.props.userData.hotelSearch.checkIn+"T08:00:00Z")} style={istyle} hintText="From" container="inline" autoOk />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <DatePicker 
                            underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                            underlineFocusStyle={{"borderColor":"#ec7132"}}
                            id="toDate" defaultDate={new Date(this.props.userData.hotelSearch.checkOut+"T08:00:00Z")} style={istyle} hintText="To" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <SelectField
                                value={this.state.valueRoom}
                                onChange={this.handleChangeRoom}
                                underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                underlineFocusStyle={{"borderColor":"#ec7132"}}
                                style={istyle}
                                >
                                <MenuItem value={1} primaryText="1 Room" />
                                <MenuItem value={2} primaryText="2 Rooms" />
                                <MenuItem value={3} primaryText="3 Rooms" />
                                <MenuItem value={4} primaryText="4 Rooms" />
                                <MenuItem value={5} primaryText="5 Rooms" />
                                <MenuItem value={6} primaryText="6 Rooms" />
                            </SelectField>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <SelectField
                                value={this.state.valueGuest}
                                onChange={this.handleChangeGuest}
                                underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                underlineFocusStyle={{"borderColor":"#ec7132"}}
                                style={istyle}
                                >
                                <MenuItem value={1} primaryText="1 guest" />
                                <MenuItem value={2} primaryText="2 guests" />
                                <MenuItem value={3} primaryText="3 guests" />
                                <MenuItem value={4} primaryText="4 guests" />
                                <MenuItem value={5} primaryText="5 guests" />
                                <MenuItem value={6} primaryText="6 guests" />
                                <MenuItem value={7} primaryText="7 guests" />
                                <MenuItem value={8} primaryText="8 guests" />
                                <MenuItem value={9} primaryText="9 guests" />
                                <MenuItem value={10} primaryText="10 guests" />
                            </SelectField>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row" style={divstyle}>
                            <button style={btnstyle}
                                id="destbtn"
                                hintText="Where"
                                type="submit"
                                onClick={()=>{
                                    this.getHotels();
                                }}
                            >
                            <IconArrow color="white" /> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row" style={{backgroundColor:'#eaebee',minHeight:'100vh',width:'100%',margin:'0px',paddingBottom:'50px'}}>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginTop:'10px',backgroundColor:'white'}}>
                                <div class="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'price'});
                                        this.getHotels();
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px',color:(this.state.type==='price')?'#80abec':'black'}}>PRICE</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'price'});
                                        this.getHotels();
                                    }}>
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
                                    <span style={{float:'left'}}>Stars</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,valueStar:0});
                                        this.getHotels();
                                    }}>RESET</span>
                                </div>
                                <div class="row" >
                                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'83%',marginTop:'0px',marginLeft:'15px'}}/>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">0+</div>
                                    <div className="col-md-3">2</div>
                                    <div className="col-md-3">3</div>
                                    <div className="col-md-3">4</div>
                                </div>
                                <div className="row" style={{marginLeft:'-30px'}}>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{this.setState({...this.state,valueStar:0});this.getHotels();}}>
                                    <IconButton tooltip="Any Stars 0+">
                                    {(this.state.valueStar<=0)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{console.log('click');this.setState({...this.state,valueStar:2});this.getHotels();}}>
                                    <IconButton tooltip="2 and up">
                                    {(this.state.valueStar<=2)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{console.log('click');this.setState({...this.state,valueStar:3});this.getHotels();}}>
                                    <IconButton tooltip="3 and up">
                                    {(this.state.valueStar<=3)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                    <div className="col-md-3" style={{marginLeft:'-3px',marginRight:'-3px'}} onClick={()=>{console.log('click');this.setState({...this.state,valueStar:5});this.getHotels();}}>
                                    <IconButton tooltip="4 and up">
                                    {(this.state.valueStar<=5)
                                    ?<IconStar width="45" height='45' />
                                    :<IconStarOut width="45" height='45' >1</IconStarOut>}
                                    </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginTop:'0px',backgroundColor:'white'}}>
                                <div class="row" style={starttitle} >
                                    <span style={{float:'left'}}>Room Type</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,roomType:'Standard'});
                                        this.getHotels();
                                    }}>RESET</span>
                                </div>
                                <div class="row" >
                                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'83%',marginTop:'0px',marginLeft:'15px'}}/>
                                </div>
                                <div className="row" style={{marginLeft:'-30px'}}>
                                <SelectField
                                    value={this.state.roomType}
                                    onChange={this.handleChangeRoomType}
                                    style={{...istyle,width:'200px',fontSize:'14px',marginLeft:'30px',marginTop:'0px'}}
                                    underlineFocusStyle={{"borderColor":"#ec7132"}}
                                    underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                    >
                                    <MenuItem value={"Standard"} primaryText="Standard" />
                                    <MenuItem value={"Suite"} primaryText="Suite" />
                                    <MenuItem value={"Delux"} primaryText="Delux" />
                                </SelectField>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div class="row">
                            <div className="col-md-12" style={{margin:'10px',marginLeft:'20px'}}>
                                {this.showHotels()}
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

const hotelstyle={
    marginBottom:'10px',
    backgroundColor:'#ffffff',
    height:'209px',
    width:'100%',
    fontFamily:'"HelveticaNeue-Medium",Helvetica,Arial,sans-serif'
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
            changeHotelListing,
            changeHotelSearch,
            changeBooking,
            loginModalOpen,
            signupModalOpen
        }
    ,dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(HotelResults));