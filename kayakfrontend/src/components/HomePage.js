import React,{Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

import CustomNavbar from './CustomNavbar';

import NavTable from './NavTable';

import HotelSearch from './HotelSearch';
import FlightSearch from './FlightSearch';
import CarSearch from './CarSearch';

import CustomSlider from './CustomSlider';
import CityList from './CityList';

import ImageList from './ImageList';
import HomeFooter from './HomeFooter';

const Background1 = "./images/hotels.jpg";
const Background2 = "./images/flights.jpg";
const Background3 = "./images/cars.jpg"

class HomePage extends Component {

    state = {
        page:'1',
    }

    render() {
        var myStyle;
        if(this.props.activeItem==="hotels"){
            myStyle = divStyle1;
        }
        else if(this.props.activeItem==="flights"){
            myStyle = divStyle2;
        } 
        else if(this.props.activeItem==="cars"){
            myStyle = divStyle3;
        }
        return (
            <div style={{width:'100vw'}}>
                {this.props.loginModal.isOpen && <LoginModal/>}
                {this.props.signupModal.isOpen && <SignupModal/>}
                <div className="row App" style={myStyle}>

                    <div className="col-md-12">
                        <div className="row" style={{marginLeft:'200px',marginRight:'200px'}}>
                            <CustomNavbar />
                            <div className="row" style={{marginTop:'-25px'}}>
                                <hr style={{borderTop:'2px solid rgba(255,255,255,0.3)',width:'100%'}}/>
                            </div>
                        </div>
                        <div className="row" style={slogan}>
                            Search hundreds of travel sites at once.
                        </div>
                        <div className="row" style={table}>
                            <NavTable />
                        </div>
                        <div className="row" style={tablec}>
                            {(this.props.activeItem==="hotels") && <HotelSearch/>}
                            {(this.props.activeItem==="flights") && <FlightSearch/>}
                            {(this.props.activeItem==="cars") && <CarSearch/>}
                        </div>
                    </div>
                </div>

                <div className="row" style={ctitle}>
                    Popular Destinations For You
                </div>
                <div className="row" style={cslider}>
                     <CustomSlider />       
                </div>

                <div className="row" style={dtitle}>
                    Start your travel planning here
                </div>
                <div className="row" style={etitle}>
                    Find Car Rentals       
                </div>
                <div className="row" style={cslider}>
                    <CityList />      
                </div>

                <div className="row" style={ftitle}>
                    Use our smart tools to make your search easier
                </div>
                <div className="row" style={dslider}>
                    <ImageList />      
                </div>
                
                <div className="row" style={{marginTop:'100px'}}>
                    <HomeFooter />
                </div>
            </div>
        );
    }
}

const divStyle1={
    width:'fit',
    height:'75vh',
    backgroundImage:'url('+Background1+')',
    backgroundPositionX:'center',
    backgroundPositionY:'-30px'
}
const divStyle2={
    width:'fit',
    height:'75vh',
    backgroundImage:'url('+Background2+')',
    backgroundPositionX:'center',
    backgroundPositionY:'-30px'
}
const divStyle3={
    width:'fit',
    height:'75vh',
    backgroundImage:'url('+Background3+')',
    backgroundPositionX:'center',
    backgroundPositionY:'-30px'
}

const slogan={
    width: '100%',
    top: '50%',
    left: '0',
    marginTop: '15px',
    color:'white',
    textAlign: 'center',
    fontFamily: '"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    fontSize: '28px',
    marginBottom: '0'
}

const table={
    marginTop:'40px',
    marginLeft:'150px',
    marginRight:'150px'
}

const tablec={
    marginTop:'-10px',
    marginLeft:'150px',
    marginRight:'150px',
    backgroundColor:'#e4e5ea',
    height:'150px'
}

const ctitle={
    margin:'50px 184px 10px 184px',
    fontSize:'20px',
    fontWeight:'600',
    fontFamily:'"HelveticaNeue-Bold", Helvetica, Arial, sans-serif',
    color:'#0f0f0f'
}

const dtitle={
    marginTop:'200px',
    fontSize:'36px',
    fontWeight:'300',
    fontFamily:'"HelveticaNeue", Helvetica, Arial, sans-serif',
    color:'#212121',
    textAlign:'center'
}

const etitle={
    marginTop:'8px',
    fontSize:'22px',
    fontWeight:'400',
    fontFamily:'"HelveticaNeue", Helvetica, Arial, sans-serif',
    color:'#8b8b8e',
    textAlign:'center'
}

const ftitle={
    marginTop:'150px',
    fontSize:'2.1em',
    fontWeight:'200',
    lineHeight: 'normal',
    fontFamily:'"HelveticaNeue", Helvetica, Arial, sans-serif',
    color:'#0f0f0f',
    textAlign:'center'
}

const cslider={
    marginLeft:'150px',
    marginRight:'150px'
}

const dslider={
    marginLeft:'110px',
    marginRight:'110px'
}

function mapStateToProps(state){
    return{
        loginModal:state.loginModal,
        signupModal:state.signupModal,
        activeItem:state.activeItem,

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            

        }
        ,dispatch);
  }
  
export default connect(mapStateToProps,matchDispatchToProps)(HomePage);
