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
class AdminAnalysis extends Component {
  constructor(){
    super();
    this.state = {
      chartHotelData:{},
      chartFlightData:{},
      chartCarData:{},
      chartCityData:{},
      current:"hotel",
      open:true
    }
  }

	componentWillMount() {

    API.checkAdminSession()
    .then(res => {
        if(res.status == 202){
            this.props.history.push("/adminLogin");
        }
    });

    this.getHotelData();
    this.getFlightData();
    this.getCarData();
    this.getCityData();
		setInterval(() => {
      this.getHotelData();
      this.getFlightData();
      this.getCarData();
      this.getCityData();
		}, 2000);
	}


  getHotelData(){
    var self = this;
    console.log("ashish");
    axios.post('http://localhost:3001/getRevenue/tophotels',{
      "year":"2017"
    })
    .then(function (response) {
      console.log(response.data.data.label);
      self.setState({
        chartHotelData:{
          labels: response.data.data.label,
          //labels:response.data.data.label,
          datasets:[
            {
              label:'Revenue',
              data:response.data.data.values,
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
    
    axios.post('http://localhost:3001/getRevenue/topflights',{
      "year":"2017"
    })
    .then(function (response) {
      console.log(response.data.data.label);
      self.setState({
        chartFlightData:{
          labels: response.data.data.label,
          //labels:response.data.data.label,
          datasets:[
            {
              label:'Revenue',
              data:response.data.data.values,
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
      
      axios.post('http://localhost:3001/getRevenue/topcars',{
        "year":"2017"
      })
      .then(function (response) {
        console.log(response.data.data.label);
        self.setState({
          chartCarData:{
            labels: response.data.data.label,
            //labels:response.data.data.label,
            datasets:[
              {
                label:'Revenue',
                data:response.data.data.values,
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

  getCityData(){
    var self = this;
    
    axios.post('http://localhost:3001/getRevenue/citywise',{
      "year":"2017"
    })
    .then(function (response) {
      console.log(response.data.data.label);
      self.setState({
        chartCityData:{
          labels: response.data.data.label,
          //labels:response.data.data.label,
          datasets:[
            {
              label:'Revenue',
              data:response.data.data.values,
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

  handleAppClick(){
    this.setState({...this.state,open:false})
  }

  handleCityClick(){
    this.setState({...this.state,current:"city"})
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
              //onRequestChange={(open) => this.setState({open})}
              >
              <AppBar title="Analysis" onLeftIconButtonTouchTap={()=>{this.handleAppClick()}}/>
              <MenuItem onClick={()=>this.handleHotelClick()}>Top 10 Hotel</MenuItem>
              <MenuItem onClick={()=>this.handleFlightClick()}>Top 10 Flight</MenuItem>
              <MenuItem onClick={()=>this.handleCarClick()}>Top 10 Car</MenuItem>
              <MenuItem onClick={()=>this.handleCityClick()}>Top 10 Cities</MenuItem>
          </Drawer>

          </div>
          <div className="col-md-9 col-sm-9" style={{marginTop:"80px"}}>
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
              this.state.current === "city" &&
              <div>
                <Bar
                  data={this.state.chartCityData}
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

export default AdminAnalysis;