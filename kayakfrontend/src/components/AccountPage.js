import React,{Component} from 'react';

import CustomNavbar from './CustomNavbar';
import {NavLink, Route} from 'react-router-dom';

import Preferences from './Preferences';
import HistoryPage from './HistoryPage';
import PaymentPage from './PaymentPage'

import HomeFooter from './HomeFooter';
import WriteReview from './WriteReview';
import * as API from '../api/API';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class AccountPage extends Component
{
    componentWillMount(){
        API.checkSession()
        .then(res => {
            if(res.status == 202){
                this.props.history.push("/");
                NotificationManager.warning('Not a member of Kayak?','Please Login To Continue',5000);
            }
        });
    }
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12" style={{backgroundColor:'black',height:'46px'}}>
                        <div className="row" style={navstyle}>
                            <CustomNavbar />
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginTop:'55px',minHeight:'600px'}}>
                    <div className="col-md-2 col-md-offset-1" style={{marginTop:'15px'}}>
                        <div className="row" style ={linkStyle}>
                            <NavLink to="/account" style={lstyle} activeStyle={linkactive}>Preferences</NavLink>
                        </div>

                        <div className="row" style ={linkStyle}>
                            <NavLink to="/payment-methods" style={lstyle} activeStyle={linkactive}>Payment Methods</NavLink>
                        </div>

                        <div className="row" style ={linkStyle}>
                            <NavLink to="/history" style={lstyle} activeStyle={linkactive}>History</NavLink>
                        </div>
                    </div>
                    <div className="col-md-9">
                            <Route exact path="/account" component={Preferences}/>
                            <Route exact path="/history" component={HistoryPage}/>
                            <Route exact path="/payment-methods" component={PaymentPage}/>
                            <Route exact path="/write-review" component={WriteReview}/>
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

export default AccountPage;