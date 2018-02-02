import React,{Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {loginModalOpen} from '../actions/loginModalAction';
import {signupModalOpen} from '../actions/signupModalAction';
import {logout} from '../actions/logoutAction';

import {withRouter} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AccountCircle from '../icons/IconAccount';
import IconButton from 'material-ui/IconButton';
import CustomItem from './CustomItem';

import IconTrips from '../icons/IconTrips';
import IconPreferences from '../icons/IconPreferences';
import ListItem from 'material-ui/List/ListItem';

import * as API from '../api/API';
import { NotificationManager } from 'react-notifications';

class ProfileItem extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          open: false,
        };
      }
      handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        });
      };
    
      handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };

    
      onSignoutClick = () => {

          API.doAdminSignOut()
          .then(res =>{
            if(res.status === 201){
                NotificationManager.success("Bye","Logout Success",2500,true);
            }
          });        
          this.props.logout();
          this.props.history.push("/adminLogin");
          
      }
    render() {

        return (
            <div className="row" style={{cursor:'pointer'}}>
                    <div className="col-md-4"></div>
                    <div className="col-md-8" onClick={this.handleTouchTap}>
                        <div className="row">
                            <div className="col-md-4" >
                                <IconButton>
                                    <AccountCircle color="white" width="32" height="32"/>
                                </IconButton>
                            </div>
                        
                            <div className="col-md-8">
                                <CustomItem name="Admin Account" />
                            </div>
                        </div>
                    </div>
                    
                    <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                    <Menu style  ={{ width:"250px",padding: "5px 15px 0px 15px"}}>
                
                        <div className="row" style={{marginTop:"0px", cursor:"pointer", lineHeight: "76px"}}>
                            <ListItem style={{height:"76px"}}  onClick={()=>{
                                this.props.history.push('/adminAccount');
                            }}>
                                <div className="col-md-2" style={{marginLeft:'-15px',marginTop:'7px'}}>
                                    <IconPreferences width="32" height="32" color="black" style={{verticalAlign:"middle",align:'center'}}/>
                                </div>
                                
                                <div className="col-md-10" style={{marginTop:"0px",marginLeft:'10px',fontWeight:'400px',fontSize:'15px'}}>
                                    <div className="row" style={{color:'black'}}>
                                    Account Preferences
                                    </div>
                                    <div className="row" style={{marginTop:'10px',color:'#8b8b8e',textOverflow:'ellipsis'}}>
                                    {this.props.adminUserData.data.email}
                                    </div>
                                </div>
                            </ListItem>
                        </div>
                        <button style={SignOutStyle}
                            onClick={()=> this.onSignoutClick()}
                        >Sign out</button>
                    </Menu>
                    </Popover>
                    
            </div>
        );
    }
}

const SignUpStyle = {
    width: "100%",
    lineHeight: "30px",
    margin: "auto",
    fontSize: "14px",
    fontWeight: 400,
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "1px",
    boxShadow: "none",
    fontFamily: "sans-serif",
    color: "#fff",
    background: "#ff690f",
    fontWeight: 600,
    padding: "0.4em",
    border: "none",
    outline: "none",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginLeft:"0px",
    marginRight:"0px"
}

const SignInStyle = {
    width: "100%",
    lineHeight: "30px",
    margin: "auto",
    fontSize: "14px",
    fontWeight: 400,
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "1px",
    boxShadow: "none",
    fontFamily: "sans-serif",
    
    color: "#ff690f",
    background: " #fff",
    fontWeight: 600,
    padding: "0.4em",
    //border: "none",
    borderColor:"#ff690f",
    outline: "none",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginTop:"10px",
    marginLeft:"0px",
    marginRight:"0px"
}

const SignOutStyle = {
    width: "100%",
    lineHeight: "30px",
    margin: "auto",
    fontSize: "14px",
    fontWeight: 400,
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "1px",
    boxShadow: "none",
    fontFamily: "sans-serif",
    
    color: "#000000",
    background: " #fff",
    fontWeight: 600,
    padding: "0.4em",
    //border: "none",
    borderColor:"#000000",
    outline: "none",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginTop:"10px",
    marginLeft:"0px",
    marginRight:"0px"
}

function mapStateToProps(state){
    return{
        adminUserData:state.adminUserData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            loginModalOpen,
            signupModalOpen,
            logout
        }
        ,dispatch);
  }
  
  export default withRouter(connect(mapStateToProps,matchDispatchToProps)(ProfileItem));