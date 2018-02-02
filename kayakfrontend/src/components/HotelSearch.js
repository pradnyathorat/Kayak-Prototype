import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import {withRouter} from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';



import {changeHotelListing} from '../actions/hotelListingAction';
import {changeHotelSearch} from '../actions/hotelSearchAction';

import * as API from '../api/API';

import AutoComplete from 'material-ui/AutoComplete';
import cities from '../data/cities';

var S;
var R;
class HotelSearch extends Component{

    componentWillMount(){
        console.log(Date.now());
        S=Date.now();
    }

    componentWillUnmount(){
        R=Date.now();
        console.log(R-S);
        API.saveRecord({record:{userid: this.props.userData.data._id,
            activity: "Hotel Homepage",
            timeSpent: R-S,
            timenow: Date.now(),
            type:"Hotel HomePage"
        }})
    }
    
    state = {
        valueRoom:1,
        valueGuest:1,
        dataSource:cities.names
        }

    handleChangeRoom = (event, index, valueRoom) => this.setState({...this.state,valueRoom:valueRoom});
    handleChangeGuest = (event, index, valueGuest) => this.setState({...this.state,valueGuest:valueGuest});

    

    render() {
        return(
            <div className="col-md-12">
                
                <div className="row" style={rstyle}>
                    <div className="col-md-3" >
                        <div className="row" style={divstyle}>
                            
                            <AutoComplete style={istyle}
                            id="destination"
                            hintText="Where"
                            required="required"
                            dataSource={this.state.dataSource}
                            onUpdateInput={this.handleDestChange}
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
                            id="fromDate" style={istyle} hintText="From" container="inline" autoOk />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <DatePicker 
                            underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                            underlineFocusStyle={{"borderColor":"#ec7132"}}
                            id="toDate" style={istyle} hintText="To" container="inline" autoOk/>
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
                                hintText="    Where"
                                type="submit"
                                onClick={()=>{
                                    
                                    var data ={
                                        city:document.getElementById('destination').value,
                                        checkIn:     document.getElementById('fromDate').value,
                                        checkOut:   document.getElementById('toDate').value,
                                        noOfRoom:   this.state.valueRoom,
                                        noOfGuest:  this.state.valueGuest,
                                        filter_prop:{ratings: 0},
                                        order:'price_asc'
                                    }
                                    if(data.city && data.checkIn && data.checkOut && (new Date(data.checkOut)-new Date(data.checkIn)>0) && (new Date(data.checkIn) > new Date())){
                                        console.log(data);
                                        this.props.changeHotelSearch(data);
                                        API.doHotelSearch(data)
                                        .then((res)=>{
                                            if(res.status===201){
                                                res.json().then(items=>{
                                                    this.props.changeHotelListing(items.data);
                                                    this.props.history.push("/hotelResults");
                                                });
                                            }
                                        });
                                    }
                                    else{
                                        NotificationManager.warning('Enter Valid Details','Search Fields are Invalid',2500);
                                    }
                                }}
                            >
                            <IconArrow color="white"/> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const rstyle={
    marginTop:'50px',
    marginRight:'15px',
    marginLeft:'15px'
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
}

const btnstyle={
    border:'none',
    fontSize:'16px',
    height:'50px',
    width:'80%',
    marginLeft:'5px',
    marginRight:'5px',
    backgroundImage: 'linear-gradient(135deg,#ff690f 0%,#ff4f3a 100%)',
}

const divstyle={
    marginLeft:'-20px',
    marginRight:'-2px',
}

function mapStateToProps(state){
    return{
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeHotelListing,
            changeHotelSearch,
        }
        ,dispatch);
  }

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(HotelSearch));
//export default HotelSearch;