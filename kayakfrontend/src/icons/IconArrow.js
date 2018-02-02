import React,{Component} from 'react';
class IconArrow extends Component{
    render() {
        return(
            <svg  
                className="hotel"
                xmlns="http://www.w3.org/2000/svg" 
                width={this.props.width} 
                height={this.props.height}
                viewBox="0 0 48 48" 
                aria-labelledby={this.props.icontitle}>
            <title id={this.props.icontitle}></title>
               <path fill={this.props.color} d="M31.88 12.32l-1.43 1.4L39.56 23H20v2h19.56l-9.11 9.27 1.43 1.41L43.35 24 31.88 12.32M11 23h6v2h-6zM5 23h3v2H5z"></path>
            </svg>
        )
    }
}

export default IconArrow;