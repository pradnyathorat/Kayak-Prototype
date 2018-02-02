import React,{Component} from 'react';
class IconStarOut extends Component{
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
                <path stroke={'#a5a7b3'} d="M19.54,24.2a1.33,1.33,0,0,1-.71-.21l-6.2-4L6.47,24a1.33,1.33,0,0,1-1.83-.4,1.31,1.31,0,0,1-.18-1l1.68-7.72L.45,9.9a1.32,1.32,0,0,1,.87-2.32H8.5L11.43.8a1.33,1.33,0,0,1,2.43,0L16.8,7.6l6.79,0a1.33,1.33,0,0,1,.91,2.29l-5.34,5,1.67,7.71a1.33,1.33,0,0,1-1,1.57Zm-6.89-5.3a1.07,1.07,0,0,1,.58.17l6.19,4a.23.23,0,0,0,.17,0,.22.22,0,0,0,.17-.27l-1.67-7.74a1.07,1.07,0,0,1,.31-1l5.34-5a.22.22,0,0,0,.07-.16.23.23,0,0,0-.23-.23H16.77a1.06,1.06,0,0,1-1-.65l-2.94-6.8a.23.23,0,0,0-.12-.12.23.23,0,0,0-.3.12L9.5,8a1.07,1.07,0,0,1-1,.64H1.32a.23.23,0,0,0-.15.39l5.69,5a1.06,1.06,0,0,1,.34,1L5.53,22.82a.22.22,0,0,0,.34.24l6.19-4A1.06,1.06,0,0,1,12.64,18.9Z" fill={this.props.color}></path>
            </svg>
        )
    }
}

export default IconStarOut;