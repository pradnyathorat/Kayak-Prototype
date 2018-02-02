import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeCarListing} from '../actions/carListingAction';
import {changeCarSearch} from '../actions/carSearchAction';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import AutoComplete from 'material-ui/AutoComplete';
import cities from '../data/cities';
var R,S;
class CarSearch extends Component{

    componentWillMount(){
        console.log(Date.now());
        S=Date.now();
    }

    componentWillUnmount(){
        R=Date.now();
        console.log(R-S);
        API.saveRecord({record:{userid: this.props.userData.data._id,
            activity: "Car Homepage",
            timeSpent: R-S,
            timenow: Date.now(),
            type:"Car Search"
        }})
    }
    

    state = {
        dataSource:cities.names
    }

    render() {
        return(
            <div className="col-md-12">
                <div className="row" style={rstyle}>
                    <div className="col-md-5" >
                        <div className="row" style={divstyle}>
                            
                            <AutoComplete style={istyle}
                            id="city"
                            hintText="Where?"
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
                    <div className="col-md-3">
                        <div className="row" style={divstyle}>
                            <DatePicker 
                            fullWidth={true}
                            underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                            underlineFocusStyle={{"borderColor":"#ec7132"}}
                            id="fromDate" style={istyle} hintText="From" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row" style={divstyle}>
                            <DatePicker 
                            fullWidth={true}
                            underlineStyle={{"borderColor":"white",marginTop:"40px"}}
                            underlineFocusStyle={{"borderColor":"#ec7132"}}
                            id="toDate" style={istyle} hintText="To" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row" style={divstyle}>
                            <button style={btnstyle}
                                id="destbtn"
                                hintText="Where"
                                onClick={()=>{
                                    var type = [];

                                    var data ={
                                        city:     document.getElementById('city').value,
                                        toDate:     document.getElementById('toDate').value,
                                        fromDate:   document.getElementById('fromDate').value,
                                        pickuptime: '',
                                        dropofftime: '',
                                        order:'price_asc',
                                        filter_prop :{type:[
                                            "Small","Medium","Large","SUV","Luxury","PickupTruck","Van","Commercial"
                                        ]}
                                    }
                                    if(data.city && data.toDate && data.fromDate && (new Date(data.toDate)-new Date(data.fromDate)>0) && (new Date(data.fromDate) > new Date())){
                                        console.log(data);
                                        this.props.changeCarSearch(data);
                                        API.doCarSearch(data)
                                        .then((res)=>{
                                            if(res.status===201){
                                                res.json().then(items=>{
                                                    this.props.changeCarListing(items.data);
                                                    this.props.history.push("/carResults");
                                                });
                                            }
                                        });
                                    }
                                    else{
                                        NotificationManager.warning('Enter Valid Details','Search Fields Are Invalid',2500);
                                    }
                                    
                                }}
                            >
                            <IconArrow color="white" style={arrowStyle}/> 
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

const arrowStyle={
    marginLeft:'-5px'
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
            changeCarListing,
            changeCarSearch,
        }
        ,dispatch);
  }

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(CarSearch));