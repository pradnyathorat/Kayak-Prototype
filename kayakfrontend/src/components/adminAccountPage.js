import React,{Component} from 'react';

import CustomNavbar from './CustomNavbar';
import {NavLink, Route} from 'react-router-dom';

import Preferences from './Preferences';
import HistoryPage from './HistoryPage';
import PaymentPage from './PaymentPage';
import {withRouter} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HomeFooter from './HomeFooter';
import AdminCustomNavbar from './AdminCustomNavBar';

class AdminAccountPage extends Component
{
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
                <div className="row" style={{marginTop:'55px',minHeight:'600px'}}>
                    <div className="col-md-2 col-md-offset-1" style={{marginTop:'15px'}}>
                        <div className="row" style ={linkStyle}>
                            <NavLink to="/adminAccount" style={lstyle} activeStyle={linkactive}>My Account</NavLink>
                        </div>
                    </div>
                    <div className="col-md-9">
                    <div className="row">
                    <span style={titlestyle}>
                        Admin Account
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        First Name
                    </div>
                    <div className="col-md-9">
                        <div>{this.props.adminUserData.data.first_name}</div>
                           
                    </div>      
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Last Name
                    </div>
                    <div className="col-md-9">
                    <div>{this.props.adminUserData.data.last_name}</div>
                           
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
                    <div>{this.props.adminUserData.data.address.street}</div>
                            
                    </div>
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        City
                    </div>
                    <div className="col-md-9">
                    <div>{this.props.adminUserData.data.address.city}</div>
                           
                    </div>  
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        State
                    </div>
                    <div className="col-md-9">
                    <div>{this.props.adminUserData.data.address.state}</div>
                            
                    </div>
                </div>
                <div className="row" style={itemstyle}>
                    <div className="col-md-2" style={labelstyle}>
                        Postal Code
                    </div>
                    <div className="col-md-9">
                    <div>{this.props.adminUserData.data.address.zip_code}</div>
                           
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
                    <div>{this.props.adminUserData.data.phone}</div>
                           
                    </div>
                    <hr style={{borderTop:'1px solid rgba(0,0,0,0.1)',width:'85%',marginTop:'33px',marginLeft:'0px'}}/>       
                </div>

                    </div>
                </div>
                <div className="row" style={{marginTop:'60px'}}>
                    <HomeFooter />
                </div>
            </div>
        )
    }
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
        adminUserData:state.adminUserData,

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            
        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminAccountPage));
