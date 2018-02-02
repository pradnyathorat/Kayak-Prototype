import React,{Component} from 'react';
class IconFlight extends Component{
    render() {
        return(
            <svg 
                className="flight" 
                xmlns="http://www.w3.org/2000/svg" 
                width={this.props.width} 
                height={this.props.height}
                viewBox="0 0 32 32" 
                aria-labelledby={this.props.icontitle}>
            <title id={this.props.icontitle}></title>
                <path fill={this.props.color} d="M16.79 7.83l-3.93 3.93 4.51 7.05.76-.76-1.34-10.22M12.24 3.15L1.62 1.76l-.75.76 7.32 4.69 4.05-4.06"></path>
                <path fill={this.props.color} d="M10.73 11.94l1.3-1.3 4.28-4.28 2.8-2.8s1.54-2.12.46-3.17-3.17.47-3.17.47l-2.62 2.62-4.4 4.4L8 9.24a20 20 0 0 0-2.23 3.2l-4.67-.89L0 12.62l3.79 2.65.92.92L7.41 20l1.07-1.1-.91-4.76a20.06 20.06 0 0 0 3.16-2.2z"></path>
            </svg>
        )
    }
}

export default IconFlight;