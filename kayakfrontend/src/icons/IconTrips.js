import React,{Component} from 'react';
class IconTrips extends Component{
    render() {
        return(
            <svg 
                className="trips" 
                xmlns="http://www.w3.org/2000/svg" 
                width={this.props.width} 
                height={this.props.height}
                viewBox="0 2 24 24" 
                aria-labelledby={this.props.icontitle}>
                <title id={this.props.icontitle}></title>
                
                <path class="colorable svg-dark-grey-default" stroke={this.props.color} fill="none"  d="M 18.6 9.39 H 5.4 a 1.84 1.84 0 0 0 -1.9 1.76 v 6.48 a 1.84 1.84 0 0 0 1.9 1.76 h 13.2 a 1.84 1.84 0 0 0 1.9 -1.76 v -6.48 a 1.84 1.84 0 0 0 -1.9 -1.76 Z M 15.13 9.29 v -0.65 c 0 -1.18 -0.67 -2.14 -1.49 -2.14 h -3.29 c -0.82 0 -1.49 1 -1.49 2.14 v 0.65"></path>
            </svg>
        )
    }
}

export default IconTrips;