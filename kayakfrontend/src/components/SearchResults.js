import React,{Component} from 'react';
import CustomNavbar from './CustomNavbar';
import {Route} from 'react-router-dom';
import HotelResults from './HotelResults'
import FlightResults from './FlightResults';
import CarResults from './CarResults';
import HomeFooter from './HomeFooter';

class SearchResults extends Component{
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
                <div className="row" style={{marginRight:'-30px'}}>
                    <div className="col-md-12" style={{backgroundColor:'#f3f4f7'}}>
                        <Route exact path="/hotelResults" component={HotelResults} />
                        <Route exact path="/flightResults" component={FlightResults}/>
                        <Route exact path="/carResults" component={CarResults}/>
                    </div>
                </div>
                <div className="row" >
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

export default SearchResults;