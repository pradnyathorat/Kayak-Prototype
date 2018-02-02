import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';

import {withRouter} from 'react-router-dom';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const Car_Types=[
    
    {
        "name":"Small"
    },
    {
        "name":"Medium"
    },
    {
        "name":"Large"
    },
    {
        "name":"SUV"
    },
    {
        "name":"Luxury"
    },
    {
        "name":"PickupTruck"
    },
    {
        "name":"Van"
    },
    {
        "name":"Commercial"
    }
];
const acs = [
    {
        "name":"True"
    },
    {
        "name":"False"
    }
]

const carTypes=[];
Car_Types.map(type=>{
    carTypes.push(<MenuItem value={type.name} key={type.name} primaryText={type.name} />);
})
 
const acTypes = [];
acs.map(type=>{
    acTypes.push(<MenuItem value={type.name} key={type.name} primaryText={type.name} />);
}) 

class AdminCars extends Component{
    constructor(props) {
        super(props);
        this.state = {
            car_name:"",
            car_type:"",
            city:"",
            model_name:"",
            car_rental_price:"",
            no_of_passengers:"0",
            luggage_capacity:"0",
            ac:"True"
        
        };
      }

      handleNameChange = (event, index, value) => {
        this.setState({...this.state,car_name:event.target.value});
      };
      handleTypeChange = (event, index, value) => {
        this.setState({...this.state,car_type:value});
      };
      handleModalNameChange = (event, index, value) => {
        this.setState({...this.state,model_name:event.target.value});
      };
      handleRentalPriceChange = (event, index, value) => {
        this.setState({...this.state,car_rental_price:event.target.value});
      };
      handleCityChange = (event, index, value) => {
        this.setState({...this.state,city:event.target.value});
      };
      handleNoOfPassengersChange = (event, index, value) => {
        this.setState({...this.state,no_of_passengers:event.target.value});
      };
      
      handleLuggageCapacityChange = (event, index, value) => {
        this.setState({...this.state,luggage_capacity:event.target.value});
      };
      handleAcChange = (event, index, value) => {
        this.setState({...this.state,ac:value});
      };

      submitCar(){
        console.log(this.state);
        API.addCarAdmin(this.state)
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    NotificationManager.success("Success", "Car Added Successfully", 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                // console.log("Fail");
                // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
      }

    render(){
        return(
            <div>
                <span style={titlestyle}>
                        Add Car 
                </span> 
                <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'100%',marginTop:'7px',marginLeft:'0px'}}/>  
                
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="car_name"
                        hintText="Car Name"
                        onChange={this.handleNameChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <SelectField
                        value={this.state.car_type}
                        onChange={this.handleTypeChange}
                        floatingLabelText="Car Type"
                        maxHeight={200}  
                    >
                        {carTypes}
                    </SelectField>
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="city"
                        hintText="City"
                        onChange={this.handleCityChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="model_name"
                        hintText="Model Name"
                        onChange={this.handleModalNameChange}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="rental_price"
                        hintText="CarRental Price"
                        onChange={this.handleRentalPriceChange}
                    />
                </div>
                <div className="row">
                    <SelectField
                            value={this.state.ac}
                            onChange={this.handleAcChange}
                            floatingLabelText="AC"
                            maxHeight={200}  
                            style={{marginLeft:"22px"}}
                        >
                            {acTypes}
                    </SelectField>
                </div>
                    
                <br/>
                <div className="row">
                    <div className="col-md-2">
                        <h4>Specifications:</h4>
                    </div>
                    <div className="col-md-3">
                        <TextField style={istyle}
                            id="no_of_passengers"
                            hintText="Number of Passengers"
                            onChange={this.handleNoOfPassengersChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <TextField style={istyle}
                            id="luggage_capacity"
                            hintText="Luggage Capacity"
                            onChange={this.handleLuggageCapacityChange}
                        />
                    </div>
                </div>
                <br/>
                <div className="row" style={divstyle}>
                    <button style={btnstyle}
                        id="destbtn"
                        onClick={()=>{this.submitCar()}}
                    >
                    Add Car
                    </button>
                </div>
            </div>
        )
    }
}

const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}

const rstyle={
    marginTop:'50px',
    marginRight:'15px',
    marginLeft:'15px'
}

const istyle={
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    
}

const roomStyle={
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    marginTop:"20px"
}

const btnstyle={
    border:'none',
    color:"white",
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'#ec7132',
    marginLeft:'5px',
    marginRight:'5px'
}
const divstyle={
    marginLeft:'7px',
    marginRight:'-2px',
    width:"300px"
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
            adminSetCurrentItem,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminCars));
