import React,{Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Route,Redirect,withRouter} from 'react-router-dom';
import IconHotel from '../icons/IconHotel';
import IconFlight from '../icons/IconFlight';
import IconCar from '../icons/IconCar';


import {setActiveItem} from '../actions/activeItem';

class NavTable extends Component{

    onClickItem(itemName){
        this.props.setActiveItem(itemName);
        this.props.history.push("/"+itemName);
       
    }

    render() {
        var myStyle1=navitem1,myStyle2=navitem2,myStyle3=navitem3,color1="black",color2="black",color3="black";
        if(this.props.activeItem==="hotels"){
            myStyle1 = {...navitem1,color:"#ec7132"};
            color1="#ec7132";
        }
        else if(this.props.activeItem==="flights"){
            myStyle2 = {...navitem2,color:"#ec7132"};
            color2="#ec7132";
        } 
        else if(this.props.activeItem==="cars"){
            myStyle3 = {...navitem3,color:"#ec7132"};
            color3="#ec7132";
        }
        return(
            <div>
                <div className="col-md-12">
                    <div className="row" style={navbar}>
                        <div className="col-md-4"  onClick={()=>this.onClickItem("hotels")}>   
                            <div className="row" style={myStyle1}>
                                <div className="col-md-3 col-md-offset-2" style={rstyle}>
                                    <IconHotel width="32" height="32" color={color1}/>
                                </div>
                                <div className="col-md-3" style={rstyle} >
                                    HOTELS
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" onClick={()=>this.onClickItem("flights")}>
                            <div className="row" style={myStyle2}>
                                <div className="col-md-3 col-md-offset-2" style={rstyle} >
                                    <IconFlight width="32" height="32" color={color2}/>
                                </div>
                                <div className="col-md-3" style={rstyle}>
                                    FLIGHTS
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" onClick={()=>this.onClickItem("cars")}>
                            <div className="row" style={myStyle3}>
                                <div className="col-md-3 col-md-offset-2" style={rstyle}>
                                    <IconCar width="32" height="32" color={color3}/>
                                </div>
                                <div className="col-md-3" style={rstyle}>
                                    CARS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const navbar={
    marginLeft:'200px',
    marginRight:'200px',
    height:'50px'
}

var navitem1={
    marginLeft:'10px',
    backgroundColor:'white',
    width:'100%',
    height:'40px',
    color:'black',
    fontSize:'12px',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    letterSpacing:'.03em',
    lineHeight: 'inherit',
    marginTop:'8px',
    cursor:'pointer'
}

var navitem2={
    backgroundColor:'white',
    width:'100%',
    height:'40px',
    color:'black',
    fontSize:'12px',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    letterSpacing:'.03em',
    lineHeight: 'inherit',
    marginTop:'8px',
    cursor:'pointer'
}

var navitem3={
    marginLeft:'-40px',
    backgroundColor:'white',
    width:'100%',
    height:'40px',
    color:'black',
    fontSize:'12px',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    letterSpacing:'.03em',
    lineHeight: 'inherit',
    marginTop:'8px',
    cursor:'pointer'
}

const rstyle={
    marginTop:'12px'
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
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(NavTable));
