import React,{Component} from 'react';
class IconSort extends Component{
    render() {
        return(
            <svg 
                className="hotel" 
                xmlns="http://www.w3.org/2000/svg" 
                width={this.props.width} 
                height={this.props.height}
                viewBox="0 0 24 24" 
                aria-labelledby={this.props.icontitle}>
            <title id={this.props.icontitle}></title>
                <path class="arrow" d="M1.97 13.53L.85 14.65l4.08 4.07L9 14.65l-1.11-1.12-2.18 2.18V5.88H4.14v9.83l-2.17-2.18z"></path>
                {(this.props.sort)?
                <path class="lines-b" fill={this.props.color} d="M11.5 6.25h12v1.5h-12zm0 8h5v1.5h-5zm0-4h8v1.5h-8z"></path>
                :<path class="lines-a" fill={this.props.color} d="M11.5 14.25h12v1.5h-12zm0-8h5v1.5h-5zm0 4h8v1.5h-8z"></path>
                }
                </svg>
        )
    }
}

export default IconSort;