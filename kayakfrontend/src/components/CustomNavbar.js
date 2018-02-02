import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setActiveItem} from '../actions/activeItem';
import {withRouter} from 'react-router-dom';
import logo from '../images/kayak.svg';
import ProfileItem from './ProfileItem';
import CustomItem from './CustomItem';
class CustomNavbar extends Component
{
    onClickItem(itemName){
        this.props.setActiveItem(itemName);
        this.props.history.push("/"+itemName);
        
    }
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img src={logo} style={imgStyle} onClick={()=>{
                            this.props.history.push('/');
                        }}/>
                    </div>
                    <div className="col-md-1" onClick={()=>this.onClickItem("hotels")}>
                        <CustomItem name="Hotels" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.onClickItem("flights")}>
                        <CustomItem name="Flights" />
                    </div>
                    <div className="col-md-1" onClick={()=>this.onClickItem("cars")}>
                        <CustomItem name="Cars" />
                    </div>
                    <div className="col-md-3 col-md-offset-4">
                        <ProfileItem />
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

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(CustomNavbar));
