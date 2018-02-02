import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import {loginModalOpen} from '../actions/loginModalAction';
import {loginModalDone} from '../actions/loginModalAction';
import {signupModalOpen} from '../actions/signupModalAction';
import {signupModalDone} from '../actions/signupModalAction';
import {changeValue} from '../actions/loginAction.js';
import {changeUserData} from '../actions/userDataAction.js';

import * as API from '../api/API';

import {NotificationContainer, NotificationManager} from 'react-notifications';
const emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"; 
class LoginModal extends React.Component {

    constructor(props){
        super(props);
        this.state = { errorEmailText: '',errorPasswordText:''}
    }

  handleOpen = () => {
    this.props.loginModalOpen();
  };

  handleClose = () => {
    this.props.loginModalDone();
  };

  onSignupClick = () => {
    this.props.loginModalDone();
    this.props.signupModalOpen();
  }
  
  handleLogin = (loginData) => {

    var cipherVal=CryptoJS.AES.encrypt(loginData.password,"kayak");

        if(loginData.email.match(emailRegex)){
            if((loginData.password).toString().length > 0 ){
                var loginDetails={
                    email:loginData.email,
                    password:cipherVal.toString(),
                }
                API.doLogin(loginDetails)
                .then((res) => {
                    console.log(res.status);
                    if (res.status === 201) {
                        console.log("Success");
                        console.log(res);
                        res.json().then(user => {
                            console.log(user.loginData);
                            this.props.changeUserData(user.loginData);
                            // this.props.loginSuccess(user);
                            // this.props.setPath("/home");
                            NotificationManager.success("Welcome", "Login Successful", 2500, true);
                            this.props.loginModalDone();
                        });
                
                    } else if (res.status === 401) {
                        console.log("Fail");
                        NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                        // this.props.history.push("/");
                    } 
                    else{
                        NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                    }
                });
            }
            else{
                NotificationManager.error("Please enter a password", "Login Failed", 2500, true);
            }
        }
        else{
            NotificationManager.error("Enter valid email", "Login Failed", 2500, true);
        }
    
  }


  render() {
    
    return (
      <div>
        <Dialog
          
          modal={false}
          open={this.props.loginModal.isOpen}
          onRequestClose={this.handleClose}
          style={{width:"600px", marginLeft:"400px",marginTop:"-50px",maxHeight:'none'}}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={false}
        >
        
        <div style={socialStyle}>
            <div class="facebookOuter socialOuter" style={facebookStyle}>
                <div class="socialButtonText" style={fbStyle}>
                    Continue with Facebook                        
                </div>
            </div>
            <div class="googleOuter socialOuter" style={googleStyle}>
                <div class="googleIcon" style={googleIconStyle}></div>
                <div class="socialButtonText" style={gStyle}>
                    Continue with Google                        
                </div>
            </div>
        </div>

        <div class="main" style={mainStyle}>
            <div class="or-sep" style={{borderTop:"1px solid #e1e1e5"}}>
                <div class="or-sep-inner" style={{marginTop: "-9px",
                        textAlign: "center"}}>
                    <div id="c2rG-loginOrSeparator" class="or-sep-text or-sep-text-visible"
                        style={loginOrSeparatorStyle}
                    >or continue with KAYAK</div>
                </div>
            </div>
        </div>
        
        <br/>
        <div class="loginMain" style={loginMainStyle}>    
            <input id="cPwX-username" type="text" name="email"  placeholder="Email Address" style={emailStyle}
                errorText={this.state.errorEmailText}
                onChange={(event)=>
                {event.persist();
                this.props.changeValue(event);
                
                }}
            />      
            <input id="cPwX-password" type="password" name="password"  placeholder="Password" style={emailStyle}
                errorText={this.state.errorPasswordText}
                onChange={(event)=>
                {event.persist();
                this.props.changeValue(event);
                
                }}
            />
            <button id="cPwX-submit"  type="submit" style={buttonStyle} onClick={()=> this.handleLogin(this.props.loginData)}>
                    <span class="">Sign in</span>
            </button>
            <a href="" id="cPwX-forgot" class="forgot-link" style={forgotPasswordStyle}>forgot password?</a>
        </div>

        <div class="footer" style={footerStyle}>
            <span id="c2rG-signup-text" style={signUpTextStyle}>
                Don't have an account?        </span>

            <button id="c2rG-signup" style={signupButtonStyle} onClick={()=> this.onSignupClick()}>
                Sign up        </button>

        </div>


        </Dialog>
        
      </div>
    );
  }
}
const fbback ="https://a1.r9cdn.net/res/images/horizon/common/authentication/facebook-icon-retina.png?v=751782376010efb12dd9ab288a227df754c86aec";
const googleBack= "https://a1.r9cdn.net/res/images/horizon/common/authentication/google-material-icon.svg?v=a1b5367556468b163f1e63b2d29c265df6d9ba50";

const socialStyle={
    padding: "59px 80px 20px",
}

const facebookStyle = {
    cursor:"pointer",
    backgroundImage: 'url('+fbback+')',
    backgroundSize: "12px 24px",
    height: "42px",
    backgroundColor: "#4267b2",
    marginBottom: "18px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "14px center"
}

const fbStyle = {
    lineHeight: "42px",
    textAlign: "center",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    marginLeft:'10px'
}

const googleIconStyle = {
    backgroundImage: 'url('+googleBack+')',
    backgroundColor:"#fff",
    position:"center",
    backgroundSize: "19px 19px",
    width: "38px",
    height: "38px",
    margin: "2px",
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px center"
}

const googleStyle = {
    cursor:"pointer",
    height: "42px",
    backgroundColor: "#4285f4",
    marginBottom: "18px",
    display:'flex',
}

const gStyle = {
    lineHeight: "42px",
    textAlign: "center",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    marginLeft:'10px'
}

const signupButtonStyle = {
    padding: "0 10px",
    height: "28px",
    lineHeight: "28px",
    backgroundColor: "#fff",
    color: "#8b8b8e",
    borderRadius: "2px",
    overflow: "inherit",
    border: "none",
    outline: "none",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
}

const signUpTextStyle = {
    marginRight: "10px",
    cursor: "pointer",
    
}

const footerStyle={
    marginTop:'-50px',
    padding: "10px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e5",
    color: "#8b8b8e"
}

const forgotPasswordStyle = {
    textAlign: "right",
    fontSize: "12px",
    marginTop: "8px",
    display: "block",
    color: "#999",
    margin: "15px 0px"
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

const loginMainStyle ={
    padding: "10px 80px 40px"
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

const mainStyle= {
    fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
    fontWeight: "400",
    fontSize: "15px",
    lineHeight: "1.231",
    color: "#0f0f0f",
    webkitFontSmoothing: "antialiased"
}

const loginOrSeparatorStyle= {
    display: "inline-block",color: "#545456",
    backgroundColor: "#fff",
    padding: "0 5px"
}

function mapStateToProps(state){
    return{
        loginModal:state.loginModal,
        loginData:state.loginData,
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            loginModalOpen,
            loginModalDone,
            signupModalOpen,
            signupModalDone,
            changeValue,
            changeUserData,
        }
        ,dispatch);
  }
  
export default connect(mapStateToProps,matchDispatchToProps)(LoginModal);


