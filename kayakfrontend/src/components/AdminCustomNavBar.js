import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setActiveItem} from '../actions/activeItem';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import {adminSetActivePage} from '../actions/adminActivePage';
import {withRouter} from 'react-router-dom';
import logo from '../images/kayak.svg';
import AdminProfileItem from './adminProfileItem';
import CustomItem from './CustomItem';
class AdminCustomNavbar extends Component
{
    onClickItem(itemName){
        this.props.setActiveItem(itemName);
        this.props.history.push("/"+itemName);
        
    }
    redirectToHotels(){
        
        this.props.adminSetCurrentItem("Hotels");
        this.props.history.push("/adminHotels");
    }
    redirectToFlights(){
        
        this.props.adminSetCurrentItem("Flights");
        this.props.history.push("/adminFlights");
    }
    redirectToCars(){

        this.props.adminSetCurrentItem("Cars");
        this.props.history.push("/adminCars");
    }

    redirectToUsers(){
        this.props.adminSetCurrentItem("Users");
        this.props.history.push("/adminShowUsers");
    }

    redirectToBilling(){
        this.props.adminSetCurrentItem("Billing");
        this.props.history.push("/adminShowHotelBill");
    }

    redirectToAnalysis(){
        this.props.history.push("/adminAnalysis");
    }

    redirectToUserTracking(){
        this.props.history.push("/adminUserTracking");
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img src={logo} style={imgStyle} onClick={()=>{
                            this.props.history.push('/adminHotels');
                        }}/>
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToHotels()}>
                        <CustomItem name="Hotels" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToFlights()}>
                        <CustomItem name="Flights" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToCars()}>
                        <CustomItem name="Cars" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToUsers()}>
                        <CustomItem name="Users" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToBilling()}>
                        <CustomItem name="Billing" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToAnalysis()}>
                        <CustomItem name="Analysis" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.redirectToUserTracking()}>
                        <CustomItem name="Tracking" />
                    </div>
                    <div className="col-md-3">
                        <AdminProfileItem />
                    </div>
                </div>
                {/* <div className="row" style={{marginTop:'-25px'}}>
                    <hr style={{borderTop:'2px solid rgba(255,255,255,0.3)',width:'100%'}}/>
                </div> */}
            </div>
        )
    }
}

const imgStyle={
    height:'25px',
    width:'130px',
    marginTop:'10px',
    marginBottom:'10px',
    background:'transparent',
    cursor:'pointer'
}

function mapStateToProps(state){
    return{
        activeItem:state.activeItem,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            setActiveItem,
            adminSetCurrentItem,
            adminSetActivePage

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminCustomNavbar));
