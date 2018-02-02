import React,{Component} from 'react';
class IconAccount extends Component{
    render() {
        return(
            <svg 
                className="hotel" 
                xmlns="http://www.w3.org/2000/svg" 
                width={this.props.width} 
                height={this.props.height}
                viewBox="0 0 32 32" 
                aria-labelledby={this.props.icontitle}>
            <title id={this.props.icontitle}></title>
                <circle stroke={this.props.color} fill="none" cx="12" cy="10" r="3.5"></circle>
                <path stroke={this.props.color} fill="none" d="M12,14c-4,0-7.21,2.67-7.47,6.05a11,11,0,0,0,14.95,0C19.21,16.67,16,14,12,14Z"></path>
                <path stroke={this.props.color} fill="none" d="M23,12A11,11,0,1,0,4.53,20.05C4.79,16.67,8,14,12,14s7.21,2.67,7.47,6.05A11,11,0,0,0,23,12Z"></path>
            </svg>
        )
    }
}

export default IconAccount;