import React,{Component} from 'react';
class IconCar extends Component{
    render() {
        return(
            <svg 
                className="car" 
                xmlns="http://www.w3.org/2000/svg" 
                width={this.props.width} 
                height={this.props.height}
                viewBox="0 0 32 32" 
                aria-labelledby={this.props.icontitle}>
            <title id={this.props.icontitle}></title>
                <path fill={this.props.color} d="M10.6 2.77L.61 1.2V0h9.99v2.77"></path>
                <path fill="none" d="M12 1.84v3.33l8.14.11C18.29 3.56 16 1.87 14.72 1.84c-.96-.03-2.72 0-2.72 0z"></path>
                <path fill={this.props.color} d="M31 7.77c-.87-1.6-8.41-2.52-8.41-2.52S17.3.46 14.53 0H6.37h1.5A7.73 7.73 0 0 0 3 1.59a18.47 18.47 0 0 0-3 4.23v3.83c0 3.86 1.55 4.49 2.53 4.52v-.13A3.76 3.76 0 1 1 10 14v.07l9-.01a3.76 3.76 0 0 1 7.52 0h.79a7 7 0 0 0 3.9-.93A28.38 28.38 0 0 0 31 7.77zm-19-2.6V1.84h2.72c1.3 0 3.56 1.72 5.42 3.45z"></path>
                <circle fill={this.props.color} cx="22.71" cy="14.04" r="2.36"></circle>
                <circle fill={this.props.color} cx="6.28" cy="14.04" r="2.36"></circle>
            </svg>
        )
    }
}

export default IconCar;