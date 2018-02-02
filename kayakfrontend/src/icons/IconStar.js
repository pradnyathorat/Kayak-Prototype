import React,{Component} from 'react';
class IconStar extends Component{
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
                <path fill={'#558fe6'} d="M8.45 7.27l2.93-6.8a.78.78 0 0 1 1.42 0l2.94 6.8a.52.52 0 0 0 .47.31H23a.78.78 0 0 1 .53 1.34l-5.34 5a.52.52 0 0 0-.15.49l1.67 7.74a.78.78 0 0 1-1.18.81l-6.2-4a.52.52 0 0 0-.56 0L5.62 23a.78.78 0 0 1-1.18-.82l1.68-7.72a.52.52 0 0 0-.16-.5l-5.69-5a.78.78 0 0 1 .51-1.38H8a.52.52 0 0 0 .45-.31z" id="Layer_1-2" data-name="Layer 1"></path>
            </svg>
        )
    }
}

export default IconStar;