import React,{Component} from 'react';
import Divider from 'material-ui/Divider'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import {adminSetActivePage} from '../actions/adminActivePage';
import {withRouter} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import AdminFlights from './AdminFlights';
import AdminHotels from './AdminHotels';
import AdminCars from './AdminCars';
import AdminAllUsers from './adminAllUsers';

import AdminAllHotels from './adminAllHotels';
import AdminAllFlights from './adminAllFlights';
import AdminAllCars from './adminAllCars';
import AdminUpdateHotel from './adminUpdateHotel';
import AdminUpdateFlight from './adminUpdateFlight';
import AdminUpdateCar from './adminUpdateCar';
import {NavLink} from 'react-router-dom';
import AdminCustomNavbar from './AdminCustomNavBar';
import AdminUpdateUser from './AdminUpdateUser';

import AdminAllBilling from './AdminAllBilling';
import AdminBill from './AdminBill';
import AdminAllHotelBill from './AdminAllHotelBill';
import AdminAllFlightBill from './AdminAllFlightBill';
import AdminAllCarBill from './AdminAllCarBill';

import adminShowBill from './adminShowBill';

import * as API from '../api/API';

class AdminHome extends Component{

    componentWillMount(){
        API.checkAdminSession()
        .then(res => {
            if(res.status == 202){
                this.props.history.push("/adminLogin");
            }
        });
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12" style={{backgroundColor:'black',height:'46px'}}>
                        <div className="row" style={navstyle}>
                            <AdminCustomNavbar />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-1" style={{marginTop:'50px'}}>
                        <div className="row" style ={linkStyle}>
                            {this.props.adminCurrentItem=="Hotels" &&
                            <NavLink to="/adminHotels" style={lstyle} activeStyle={linkactive}>Add {this.props.adminCurrentItem}</NavLink>}
                            {this.props.adminCurrentItem=="Flights" &&
                            <NavLink to="/adminFlights" style={lstyle} activeStyle={linkactive}>Add {this.props.adminCurrentItem}</NavLink>}
                            {this.props.adminCurrentItem=="Cars" &&
                            <NavLink to="/adminCars" style={lstyle} activeStyle={linkactive}>Add {this.props.adminCurrentItem}</NavLink>}

                            {this.props.adminCurrentItem=="Users" &&
                            <NavLink to="/adminShowUsers" style={lstyle} activeStyle={linkactive}>Show All {this.props.adminCurrentItem}</NavLink>}

                            {this.props.adminCurrentItem=="Billing" &&
                            <NavLink to="/adminShowHotelBill" style={lstyle} activeStyle={linkactive}> Hotel Bills</NavLink>}
                            

                        </div>

                        <div className="row" style ={linkStyle}>
                            {this.props.adminCurrentItem=="Hotels" &&
                            <NavLink to="/adminshowHotels" style={lstyle} activeStyle={linkactive}>Show All {this.props.adminCurrentItem}</NavLink>
                            }
                            {this.props.adminCurrentItem=="Flights" &&
                            <NavLink to="/adminshowFlights" style={lstyle} activeStyle={linkactive}>Show All {this.props.adminCurrentItem}</NavLink>
                            }
                            {this.props.adminCurrentItem=="Cars" &&
                            <NavLink to="/adminshowCars" style={lstyle} activeStyle={linkactive}>Show All {this.props.adminCurrentItem}</NavLink>
                            }
                            {this.props.adminCurrentItem=="Billing" &&
                            <NavLink to="/adminShowFlightBill" style={lstyle} activeStyle={linkactive}> Flight Bills</NavLink>}
                        </div>
                        <div className="row" style ={linkStyle}>
                        {this.props.adminCurrentItem=="Billing" &&
                            <NavLink to="/adminShowCarBill" style={lstyle} activeStyle={linkactive}> Car Bills</NavLink>}
                        </div>

                    </div>   
                
                    <div className="col-md-8 " style={{marginTop:"20px"}}>
                        <Route exact path='/adminHotels' component={AdminHotels}/>
                        <Route exact path='/adminFlights' component={AdminFlights}/>
                        <Route exact path='/adminCars' component={AdminCars}/>
                        <Route exact path='/adminShowUsers' component={AdminAllUsers}/>
                        <Route exact path="/adminShowHotels" component={AdminAllHotels}/>
                        <Route exact path="/adminShowFlights" component={AdminAllFlights}/>
                        <Route exact path="/adminShowCars" component={AdminAllCars}/>
                        <Route exact path="/adminUpdateHotel" component={AdminUpdateHotel}/>
                        <Route exact path="/adminUpdateFlight" component={AdminUpdateFlight}/>
                        <Route exact path="/adminUpdateCar" component={AdminUpdateCar}/>
                        <Route exact path="/adminUpdateUser" component={AdminUpdateUser}/>
                        <Route exact path="/adminShowBilling" component={AdminAllBilling}/>
                        <Route exact path="/adminShowHotelBill" component={AdminAllHotelBill}/>
                        <Route exact path="/adminShowFlightBill" component={AdminAllFlightBill}/>
                        <Route exact path="/adminShowCarBill" component={AdminAllCarBill}/>
                        <Route exact path="/adminShowBill" component={adminShowBill}/>
                    </div>
                    {/* <div className="col-md-3">

                    
                        {   this.props.adminActivePage=="add" &&

                            <RaisedButton backgroundColor="#03A9F4" style={{"marginTop":"30px"}} onClick={()=>{this.showAll()}}>
                                Show {this.props.adminCurrentItem}
                            </RaisedButton>
                        }
                        {   this.props.adminActivePage=="all" &&

                            <RaisedButton backgroundColor="#03A9F4" style={{"marginTop":"30px"}} onClick={()=>{this.addItem()}}>
                            Add {this.props.adminCurrentItem}
                            </RaisedButton>
                        }
                    </div> */}
                </div>
                
            </div>
        )
    }
}
const ListStyle = {
    marginLeft:"25px",
    marginTop:"50px"
  };

const buttonStyle = {
    backgroundColor: "#545456",
    color: "#fff",
    borderRadius: "2px",
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16)",
    height: "42px",
    width: "100%",
    fontSize: "16px",
    marginTop:"50px"
}

const navstyle={
    marginLeft:'120px',
    marginRight:'120px'
}
const lstyle={
    fontSize: '15px',
    lineHeight: '16px',
    color: '#666666',
    display: 'block',
    msFlex: '1',
    textDecoration: 'none',
    fontWeight:'500'
}
const linkStyle={
    marginBottom: "20px"
}

const linkactive={
    color: '#000000'
}

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminCurrentItem:state.adminCurrentItem,
        adminActivePage:state.adminActivePage,

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            adminSetCurrentItem,
            adminSetActivePage,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminHome));
