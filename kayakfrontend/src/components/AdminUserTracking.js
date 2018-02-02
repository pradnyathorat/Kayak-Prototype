import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

import * as API from '../api/API';
import axios from 'axios';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {Doughnut} from 'react-chartjs-2';
import AdminCustomNavbar from './AdminCustomNavBar';

var data;

const TraceData = {
  labels: ['Hotel HomePage','San Jose Hotel', 'Flight HomePage', 'Car HomePage', 'Flight HomePage','San Jose-New York Flight'],
  datasets: [
    {
      label: 'User Trace',
      backgroundColor: 'rgba(75,192,192,0.4)',
      data: [65, 59, 80, 81, 56,91]
    }
  ]
};
class AdminUserTracking extends Component {
  constructor(){
    super();
    this.state = {
      chartHotelData:{},
      chartFlightData:{},
      chartCrData:{},
      current:"hotel",
      users:0,
      hotels:0,
      flights:0,
      cars:0
    }
  }

	componentWillMount() {

    API.checkAdminSession()
    .then(res => {
        if(res.status == 202){
            this.props.history.push("/adminLogin");
        }
    });
    API.getCount()
    .then((res)=>{
      if(res.status==201){
        res.json().then(data=>{
          console.log(data.message.data);
          var count = data.message.data;
          this.setState({...this.state,users:count.users,flights:count.flights,hotels:count.hotels,cars:count.cars})
        })
      }
    })
    this.getHotelData();
    this.getFlightData();
    this.getCarData();
		setInterval(() => {
      this.getHotelData();
      this.getFlightData();
      this.getCarData();
		}, 2000);
	}


  getHotelData(){
    var self = this;
    console.log("ashish");
    axios.post('http://localhost:3001/topTenHotel',{
      "year":"2017"
    })
    .then(function (response) {
      //console.log(response.data.data.label);
      var labels = [];
      var resData=[];
      console.log(JSON.stringify(response.data));
      if(response.data.message){
        response.data.message.map(item=>{
            labels.push(item.name);
            resData.push(item.value);
        })
      }
      
      
      self.setState({
        chartHotelData:{
          labels: labels,
          //labels:response.data.data.label,
          datasets:[
            {
              label:'Hotel',
              data:resData,
              backgroundColor:[
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
            }
          ]
        }
      });
    });
      
  }

  getFlightData(){
    var self = this;
    
    axios.post('http://localhost:3001/topTenFlight',{
      "year":"2017"
    })
    .then(function (response) {
        //console.log(response.data.data.label);
        var labels = [];
        var resData=[];
        console.log(JSON.stringify(response.data));
        if(response.data.message){
          response.data.message.map(item=>{
              labels.push(item.name);
              resData.push(item.value);
          })
        }
        
        
        self.setState({
          chartFlightData:{
            labels: labels,
            //labels:response.data.data.label,
            datasets:[
              {
                label:'Flight',
                data:resData,
                backgroundColor:[
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]
          }
        });
      });
  }

    getCarData(){
      var self = this;
      
      axios.post('http://localhost:3001/topTenCar',{
        "year":"2017"
      })
      .then(function (response) {
        //console.log(response.data.data.label);
        var labels = [];
        var resData=[];
        console.log(JSON.stringify(response.data));
        if(response.data.message){
          response.data.message.map(item=>{
              labels.push(item.name);
              resData.push(item.value);
          })
        }
        
        
        self.setState({
          chartCarData:{
            labels: labels,
            //labels:response.data.data.label,
            datasets:[
              {
                label:'Car',
                data:resData,
                backgroundColor:[
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]
          }
        });
      });
  }

  

  handleHotelClick(){
    this.setState({...this.state,current:"hotel"})
  }
  handleFlightClick(){
    this.setState({...this.state,current:"flight"})
  }
  handleCarClick(){
    this.setState({...this.state,current:"car"})
  } 

  handleUserTrack(){
    this.setState({...this.state,current:"trace"})
  }

  render() {
    return (
      <div className="App">
        <div className="row">
        <div className="col-md-12" style={{backgroundColor:'black',height:'46px'}}>
            <div className="row" style={navstyle}>
                <AdminCustomNavbar />
            </div>
        </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-3">
            <Drawer
              docked={true}
              width={300}
              open={true}
              onRequestChange={(open) => this.setState({open})}
              
              >
              <AppBar title="User Tracking" />
              <MenuItem onClick={()=>this.handleHotelClick()}>Top 10 Cities for Hotel Search</MenuItem>
              <MenuItem onClick={()=>this.handleFlightClick()}>Top 10 Cities for Flight Search</MenuItem>
              <MenuItem onClick={()=>this.handleCarClick()}>Top 10 cities for Car Search</MenuItem>
              <MenuItem onClick={()=>this.handleUserTrack()}>User Trace</MenuItem>
          </Drawer>

          </div>
          <div className="col-md-8 col-sm-8" style={{marginTop:"80px"}}>
            <div className="row" style={{marginBottom:'20px',fontSize:'20px',fontWeight:'400'}}>
                <div className="col-md-3 col-sm-3">
                    Users:{this.state.users}
                </div>
                <div className="col-md-3 col-sm-3">
                    Hotels:{this.state.hotels}
                </div>
                <div className="col-md-3 col-sm-3">
                    Flights:{this.state.flights}
                </div>
                <div className="col-md-3 col-sm-3">
                    Cars:{this.state.cars}
                </div>
            </div>
            <div className="row">
            {
              this.state.current === "hotel" &&
              <div>
                <Bar
                  data={this.state.chartHotelData}
                  options={{
                    title:{
                      display:this.props.displayTitle,
                      text:' '+this.props.location,
                      fontSize:25
                    },
                    legend:{
                      display:this.props.displayLegend,
                      position:this.props.legendPosition
                    }
                  }}
                />
              </div>
            }
            {
              this.state.current === "flight" &&
                <Pie
                data={this.state.chartFlightData}
                options={{
                  title:{
                    display:this.props.displayTitle,
                    text:'Largest Cities In '+this.props.location,
                    fontSize:25
                  },
                  legend:{
                    display:this.props.displayLegend,
                    position:this.props.legendPosition
                  }
                }}
              />
            }
            {
              this.state.current === "car" &&
              <div>
                
              <Doughnut
                
                data={this.state.chartCarData}
                options={{
                  title:{
                    display:this.props.displayTitle,
                    text:' '+this.props.location,
                    fontSize:25
                  },
                  legend:{
                    display:this.props.displayLegend,
                    position:this.props.legendPosition
                  }
                }}
              />
            </div>
            }
            {
              this.state.current === "trace" &&
              <div>
                <Line data={TraceData}
                  
                />
              </div>
            }
            </div>
            
          </div>
        </div>
        
        

        {/* <div>
          <Bar
            data={this.state.chartHotelData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:' '+this.props.location,
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />
        </div>
        <div>
        <Pie
          data={this.state.chartFlightData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        </div> */}
  </div>
    );
  }
}
const navstyle={
    marginLeft:'320px',
    marginRight:'70px'
  }

export default AdminUserTracking;