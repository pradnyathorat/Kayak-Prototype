import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminLoginSuccess} from '../actions/adminLoginAction';

import {withRouter} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import * as API from '../api/API';

class AdminLogin extends Component{

    handleLogin = (adminLoginData) => {

        var cipherVal=CryptoJS.AES.encrypt(adminLoginData.password,"kayak");
        
        var adminLoginDetails={
            email:adminLoginData.email,
            password:cipherVal.toString(),
        }

        API.doAdminLogin(adminLoginData)
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(admin => {
                    this.props.adminLoginSuccess(admin.loginData);
                    NotificationManager.success("Welcome", "Login Successful", 2500, true);
                    this.props.history.push("/adminAccount");
                });
        
            } else if (res.status === 401) {
                NotificationManager.error("Fail", "Login Failed", 2500, true);
                // console.log("Fail");
                // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
      }

    render(){
        return(
            <div>
                <h1 style={{color:"skyblue", marginLeft:"650px"}}>Kayak Admin </h1>
                <div className="loginMain" style={loginMainStyle}>    
                    <input id="cPwX-username" type="text" name="email"  placeholder="Email Address" style={emailStyle}
                        onChange={(event)=>
                        {event.persist();
                        this.props.changeValueAdmin(event);
                        }}
                    />      
                    <input id="cPwX-password" type="password" name="password"  placeholder="Password" style={emailStyle}
                        onChange={(event)=>
                        {event.persist();
                        this.props.changeValueAdmin(event);
                        }}
                    />
                    <button id="cPwX-submit"  type="submit" style={buttonStyle} onClick={()=> this.handleLogin(this.props.adminLoginData)}>
                            <span className
                            ="">Sign in</span>
                    </button>
                </div>
            </div>
        )
    }
}

const loginMainStyle ={
    
    marginTop:"200px",
    marginLeft:"500px",
    width:"500px",
}

const emailStyle = {
    marginBottom: "15px",
    width: "100%",
    height: "2.4em",
    padding: ".3333333em .3333333em .3333333em .6em",
    border: "1px solid #c2c2c6",
    borderRadius: ".0666667em",
    fontFamily: "sans-serif",
    fontSize: "100%",
    lineHeight: "1.15",
}
const buttonStyle = {
    backgroundColor: "#545456",
    color: "#fff",
    borderRadius: "2px",
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16)",
    height: "42px",
    width: "100%",
    fontSize: "16px"
}


function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminLoginSuccess,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminLogin));
