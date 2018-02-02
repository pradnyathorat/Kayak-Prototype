import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {NotificationContainer, NotificationManager} from 'react-notifications';

import {signupModalOpen} from '../actions/signupModalAction';
import {signupModalDone} from '../actions/signupModalAction';
import {loginModalOpen} from '../actions/loginModalAction';
import {loginModalDone} from '../actions/loginModalAction';
import {changeValue} from '../actions/signupAction.js';

import * as API from '../api/API';
const emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
class signupModal extends React.Component {

  handleOpen = () => {
    this.props.signupModalOpen();
  };

  handleClose = () => {
    this.props.signupModalDone();
  };

  onSigninClick = () => {
    this.props.signupModalDone();
    this.props.loginModalOpen();
  }

  handleSignup = (signupData) => {

    var cipherVal=CryptoJS.AES.encrypt(signupData.password,"kayak");

    if(signupData.email.match(emailRegex)){
        
        if((signupData.password).toString().length > 4 ){
            var signupDetails={
                email:signupData.email,
                password:cipherVal.toString(),
            }
        
        
            API.doSignup(signupDetails)
            .then((res) => {
                if (res.status === 201) {
                    console.log("Success");
                    res.json().then(user => {
                        // this.props.loginSuccess(user);
                        // this.props.setPath("/home");
                        console.log(user);
                        this.props.signupModalDone();
                        NotificationManager.success("Welcome", "Sign Up Successful. Log Into Your Account Now", 2500, true);
                        this.props.loginModalOpen();
                        //this.props.history.push("/");
                    });
            
                } else if (res.status === 202) {
                    NotificationManager.error("Fail", "User Exists", 2500, true);
                    // console.log("Fail");
                    // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                    // this.props.history.push("/");
                } else
                {
                    console.log("Fail");
                    // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                    // this.props.history.push("/");
                }
            });
        }
        else{
            NotificationManager.error("Password length must be greater than 4", "Signup Failed", 2500, true);
        }
    }
    else{
        NotificationManager.error("Enter valid email", "Signup Failed", 2500, true);
        
    }
    
  }

  
  
  render() {
    
    return (
      <div>
        <Dialog
          
          modal={false}
          open={this.props.signupModal.isOpen}
          onRequestClose={this.handleClose}
          style={{width:"600px", marginLeft:"400px",marginTop:"-50px",height:'fit-content'}}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
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
                    <div id="c2rG-signupOrSeparator" class="or-sep-text or-sep-text-visible"
                        style={signupOrSeparatorStyle}
                    >or create a KAYAK account</div>
                </div>
            </div>
        </div>
        
        <br/>
        <div class="signupMain" style={signupMainStyle}>    
            <input id="cPwX-username" type="text" name="email"  placeholder="Email Address" style={emailStyle}
                onChange={(event)=>
                {event.persist();
                this.props.changeValue(event);
                }}
            />      
            <input id="cPwX-password" type="password" name="password"  placeholder="Password" style={emailStyle}
                onChange={(event)=>
                {event.persist();
                this.props.changeValue(event);
                }}
            />
            <button id="cPwX-submit"  type="submit" style={buttonStyle} onClick={()=> this.handleSignup(this.props.signupData)}>
                    <span class="">Create Account</span>
            </button>
            
        </div>

        <div class="footer" style={footerStyle}>
            <span id="c2rG-signup-text" style={signUpTextStyle}>
            Already have an account? </span>

            <button id="c2rG-signup" style={signupButtonStyle} onClick={()=> this.onSigninClick()} >
                Sign in       </button>

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
    marginLeft:'25px'
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
    display:'flex'
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
    padding: "10px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e5",
    color: "#8b8b8e"
}

const forgotPasswordStyle = {
    marginBottom: "0",
    textAlign: "right",
    fontSize: "12px",
    marginTop: "8px",
    display: "block",
    color: "#999",
    margin: "15px auto"
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

const signupMainStyle ={
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

const signupOrSeparatorStyle= {
    display: "inline-block",color: "#545456",
    backgroundColor: "#fff",
    padding: "0 5px"
}

function mapStateToProps(state){
    return{
        signupModal:state.signupModal,
        signupData:state.signupData,

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            signupModalOpen,
            signupModalDone,
            loginModalOpen,
            loginModalDone,

            changeValue,
        }
        ,dispatch);
  }
  
export default connect(mapStateToProps,matchDispatchToProps)(signupModal);


