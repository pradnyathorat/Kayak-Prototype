import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeFlightListing} from '../actions/flightListingAction';
import {changeFlightSearch} from '../actions/flightSearchAction';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import AutoComplete from 'material-ui/AutoComplete';
import cities from '../data/cities';
var R,S;
class FlightSearch extends Component{

    componentWillMount(){
        console.log(Date.now());
        S=Date.now();
    }

    componentWillUnmount(){
        R=Date.now();
        console.log(R-S);
        API.saveRecord({record:{userid: this.props.userData.data._id,
            activity: "Flight Homepage",
            timeSpent: R-S,
            timenow: Date.now(),
            type:"Hotel HomePage"
        }})
    }
    

    state = {
        valueClass: 'Economy',
        valueTraveler: 1,
        dataSource:cities.names
    }

    handleChangeClass = (event, index, valueClass) => this.setState({...this.state,valueClass:valueClass});
    handleChangeTraveler = (event, index, valueTraveler) => this.setState({...this.state,valueTraveler:valueTraveler});
    render() {
        return(
            <div className="col-md-12">
                <div className="row" style={rstyle}>
                    <div className="col-md-2" >
                        <div className="row" style={divstyle}>
                            
                            <AutoComplete style={istyle}
                            id="source"
                            hintText="From Where?"
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
                            
                            <AutoComplete style={istyle}
                            id="destination"
                            hintText="To Where?"
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
                            <div className="col-md-6">
                                <div className="row" style={divstyle}>
                                    <DatePicker 
                                    underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                    underlineFocusStyle={{"borderColor":"#ec7132"}}
                                    id="fromDate" style={istyle} hintText="Departure" container="inline" autoOk/>
                                </div>
                            </div>
                            {/* <div className="col-md-3">
                                <div className="row" style={divstyle}>
                                    <DatePicker
                                    underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                                    underlineFocusStyle={{"borderColor":"#ec7132"}}
                                    id="toDate" style={istyle} hintText="To" container="inline" autoOk/>
                                </div>
                            </div> */}
                            <div className="col-md-3">
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
                                    var filter_prop = {
                                        stops: [],
                                        flight_name: []
                                    }
                                    var order = this.state.type+(this.state.sort?'_desc':'_asc');
                                    var data ={
                                        origin:     document.getElementById('source').value,
                                        destination:document.getElementById('destination').value,
                                        //arrival_date:     document.getElementById('toDate').value,
                                        departure_date:   document.getElementById('fromDate').value,
                                        class:      this.state.valueClass,
                                        no_of_traveler:this.state.valueTraveler,
                                        order:'arrival_desc',
                                        filter_prop
                                    }
                                    if(data.origin && data.destination && !(data.origin===data.destination) && data.departure_date && (new Date(data.departure_date) > new Date())){
                                        console.log(data);
                                        this.props.changeFlightSearch(data);
                                        API.doFlightSearch(data)
                                        .then((res)=>{
                                            if(res.status===201){
                                                res.json().then(items=>{
                                                    this.props.changeFlightListing(items.data);
                                                    this.props.history.push("/flightResults");
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
    borderColor:'black'
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
    marginRight:'-2px'
}

function mapStateToProps(state){
    return{
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeFlightListing,
            changeFlightSearch,
        }
    ,dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(FlightSearch));